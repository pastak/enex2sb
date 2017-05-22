import md5 from 'nano-md5'
import htmlparser from 'htmlparser2'
import {parse as html2SbParse, toScrapbox as token2Sb} from 'html2sb-compiler'
import {find, findAll} from './libs/utils'

export default async (uploadImage, input, options) => {
  let xmlString = input
  if (typeof input === 'object') {
    if (input instanceof Buffer) {
      xmlString = input.toString()
    } else if (typeof input !== 'string') {
      throw new Error('It allows string or buffer')
    }
  }
  const handler = new htmlparser.DomHandler()
  const parser = new htmlparser.Parser(handler)
  parser.parseComplete(xmlString)
  const parsedData = handler.dom
  const notes = findAll('note', find('en-export', parsedData)).reverse()
  return await Promise.all(notes.map(async (note) => {
    const title = find('title', note).children[0].data
    const content = find('content', note)

    const ENNoteData = content.children[0].data
    const ENNoteXML = ENNoteData.match(/\[CDATA\[([.\s\S]+)]]/)[1]

    let resources = {}

    await Promise.all(findAll('resource', note).map(async (resource) => {
      const mimeType = find('mime', resource).children[0].data
      if (/^image\/.*/.test(mimeType)) {
        const file = new Buffer(find('data', resource).children[0].data, 'base64')
        const calculatedMd5 = md5.fromBytes(file.toString('latin1')).toHex()
        const res = await uploadImage(file, options)
        resources[calculatedMd5] = res.data.permalink_url
      }
    }))

    console.log(JSON.stringify(html2SbParse(ENNoteXML, {evernote: true})))

    const result = token2Sb(html2SbParse(ENNoteXML, {evernote: true}))

    const tags = findAll('tag', note).map((_) => '#' + _.children[0].data)

    const lines = (title + '\n' + result + '\n\n' + tags.join(' ') + '\n').split('\n')
    return {lines, title}
  }))
}
