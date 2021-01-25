
function getHtml(template, title) {
  const html = `
    <!DOCTYPE html>
      <html>
      <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
      <style>
        .el-table__body, .el-table__footer, .el-table__header{
          table-layout: auto
        }
        table {
          width: 100%!important;
        }
      </style>
      </head>
      <body>
      <div class="resume_preview_page" style="margin:0 auto;width:1200px">
      <h2>${title}</h2>
      ${template}
      </div>
      </body>
      </html>`
  return html
}
export default {
  getHtml
}
