const path = require('path').posix;

const slugify = require('slugify');
const resolveTemplate = (layout) => {
    layout = layout || 'default';
    return path.resolve(`src/layouts/${layout}.js`);
}

exports.onCreateNode = ({node, actions, getNode}) => {
    const { createNodeField } = actions;
    const fileBaseDir = 'src';

    //

    const parentNode = getNode(node.parent);

    switch(node.internal.type) {
    case 'File':
        // Store the filename without the extension.
        const parsedPath = path.parse(node.absolutePath);
        createNodeField({ node, name: 'slug', value: parsedPath.name });

        // Store the relative path of the file without the filename.
        const relativePath = path.relative(
            path.join(__dirname,fileBaseDir),
            parsedPath.dir);
        createNodeField({ node, name: 'dir',
                          value: relativePath });

        // Store the full path of the source file relative to the project root.
        const fullPath = path.relative(__dirname, node.absolutePath);
        createNodeField({ node, name: 'path', value: fullPath });

        break;

    case 'MarkdownRemark':
        // If a custom slug is defined, use that
        // Use the parent node's name otherwise
        const slug = (node.frontmatter.slug || parentNode.fields.slug);

        createNodeField({
            node, name: 'dir',
            value: parentNode.fields.dir });

        createNodeField({
            node: node, name: 'slug',
            value: slug });

        createNodeField({
            node: node, name: 'sourcePath',
            value: parentNode.fields.path });

        createNodeField({
            node: node, name: 'path',
            value: path.relative(
                'pages',
                path.join(parentNode.fields.dir, slug)
            )
        });

        createNodeField({
            node: parentNode, name: 'slug',
            value: slug });

        break;
    default:

        if (parentNode && parentNode.internal.type === "File") {

            createNodeField({
                node, name: 'dir',
                value: parentNode.fields.dir });

            createNodeField({
                node, name: 'slug',
                value: parentNode.fields.slug
            })

        }

        break;

    }
};

exports.createPages = ({graphql, actions}) => {
    const { createPage } = actions;

    return new Promise((resolve, reject) => {
        const defaultLayout = 'default';

        graphql(
            `
{
  allMarkdownRemark (
    limit: 1000
    filter: { frontmatter: { draft: { ne: true } } }
  ) {
    edges {
      node {
        id
        fields{
          slug
          dir
        }
        frontmatter {
          tags
          category
          layout
        }
      }
    }
  }
}
`
        ).then(result => {
            if (result.errors){
                console.log(result.errors);
            }

            // Turn all markdown files into pages
            result.data.allMarkdownRemark.edges.forEach(edge => {

                const { fields, frontmatter, id } = edge.node;

                // Extract bits of data used to determine what to do
                const splitDir = fields.dir.split('/');
                const baseDir = splitDir[0];
                const slug = fields.slug === '_index' ? '/' : fields.slug;

                // Create a page path by removing "pages/" from the path field
                const pageDir = splitDir.slice(1).join('/');
                const pagePath = path.join(
                    pageDir,
                    slug
                );


                switch(pageDir) {
                case 'posts':

                }

                const layout = resolveTemplate(frontmatter.layout);

                createPage({
                    path: pagePath,
                    component: layout,
                    context: {
                        pageID: id,
                    }
                });
            });
        });
        resolve();
    });
};
