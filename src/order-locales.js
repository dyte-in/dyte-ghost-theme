'use strict'

const fs = require('fs')
const path = require('path')
const locales = '../locales'

fs.readdir(locales, (err, files) => {
  if (err) return console.error(err)

  files.forEach((file) => {
    const unordered = JSON.parse(fs.readFileSync(path.join(locales, file)))
    const ordered = {}

    Object.keys(unordered)
      .sort()
      .forEach((key) => {
        ordered[key] = unordered[key]
      })

    fs.writeFileSync(
      path.join(locales, file),
      JSON.stringify(ordered, null, 2).concat('\n')
    )
  })
})
