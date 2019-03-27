# SWAGGING

Swagging is a tool that makes it easier to write and display the documentation of your API's. It runs a [Swagger Editor](https://swagger.io/tools/swagger-editor/) and [Swagger UI](https://swagger.io/tools/swagger-ui/) instances locally so that you can see it as you make it.

Swagging is installed along with the project as a development dependency so you won't need any external tool to help you creating your API's docs.

## Installation 

    npm i -D swagging

## Quick Usage

- Create a `swagger.yaml` file in the root of your project
- Create a **npm script** in `package.json`
 
      "scripts": {
		"swagging": "swagging"
	  }

If everything goes well two new browser tabs will open displaying Swagger Editor and Swagger UI. If it doesn't, check for the console output, you may need to copy and paste the provided URLs.

## Reference

As for now Swagging can understand two optional parameters: 

- `swagger`:  Path for the Swagger file in [YAML](https://yaml.org/) format. **Default:** _./swagger.yaml_

- `ui-port`:  To specify the port of Swagger UI server. **Default:** _3010_