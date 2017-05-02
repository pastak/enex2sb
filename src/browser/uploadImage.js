import upload from 'gyazo-browser-upload'

export default async (buffer) => {
  return await upload(buffer.toString('base64'), {
    clientId: 'enex2sb'
  })
}
