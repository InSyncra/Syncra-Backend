# ROUTES/FEATURES to Test

## Functions
### validateRequestBody

## Project Routes
### GET /projects
- should exist
- should return array of projects
- accepts and returns array based on query
- on success, should return response {data, error: null, success: true}
- should return error if 500 status

### POST /projects
- should exist
- should accept required and optional params
- should return error if missing required params
- should only allow logged in user to create project
- should return the following response {data, error: null, success: true}
- on error should return {data: null, error, success:false}
