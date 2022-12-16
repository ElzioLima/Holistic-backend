import paths from "./paths"
import schemas from "./schemas"
import components from "./components"

export default {
  openapi: "3.0.1",
  info: {
    title: "secret-wave-Node-API",
    description: "APIs Test",
    version: "1.0.0",
    contact: {
      name: "Elzio Lima",
      email: "elziolimach@gmail.com",
    },
    license: {
      name: "GPL-3.0-or-later",
      url: "https://spdx.org/licenses/GPL-3.0-or-later.html"
    }
  },
  servers: [{
    url: "/api",
    description: "Main Server"
  }],
  tags: [{
    name: "Authentication",
    description: "Authentication APIs"
  }],
  paths,
  schemas,
  components
}
