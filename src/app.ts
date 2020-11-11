import {server} from './server'

async function main() {
  const app = new server(8000)
  await app.init()
}
main()