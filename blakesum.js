#!/usr/bin/env node

const fs = require('fs')
const sodium = require('sodium-universal')

const hash = sodium.crypto_generichash_instance()

fs.createReadStream(process.argv[2])
  .on('data', function (data) {
    hash.update(data)
  })
  .on('end', function () {
    const out = Buffer.alloc(32)
    hash.final(out)
    console.log(out.toString('hex'))
  })
