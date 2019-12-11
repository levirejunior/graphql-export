import axios from 'axios';

const fs = require('fs');
const instrospectionQuery = `
        query IntrospectionQuery {
            __schema {
                queryType {
                    name
                }
                mutationType {
                    name
                }
                types {
                    ...FullType
                }
                directives {
                    name
                    description
                    locations
                    args {
                        ...InputValue
                    }
                }
            }
        }
        fragment FullType on __Type {
            kind
            name
            description
            fields(includeDeprecated: true) {
                name
                description
                args {
                    ...InputValue
                }
                type {
                    ...TypeRef
                }
                isDeprecated
                deprecationReason
            }
            inputFields {
                ...InputValue
            }
            interfaces {
                ...TypeRef
            }
            enumValues(includeDeprecated: true) {
                name
                description
                isDeprecated
                deprecationReason
            }
            possibleTypes {
                ...TypeRef
            }
        }
        fragment InputValue on __InputValue {
            name
            description
            type {
                ...TypeRef
            }
            defaultValue
        }
        fragment TypeRef on __Type {
            kind
            name
            ofType {
                kind
                name
                ofType {
                    kind
                    name
                    ofType {
                        kind
                        name
                        ofType {
                            kind
                            name
                            ofType {
                                kind
                                name
                                ofType {
                                    kind
                                    name
                                    ofType {
                                        kind
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    `;

const convert = async function (url, converter) {
    const formatConverter = require(`./${converter}/${converter}`);
    try {
        let response = await getSchema(url, instrospectionQuery);
        const c = Object.create(formatConverter.default.prototype)
        let data = c.convert(response.data, url)
        fs.writeFileSync('export.json', data);
        console.log("File saved to export.json");
    } catch (err) {
        console.log(err);
        console.log('Could not introspect graphql server, please check the root url')
    }
}

const getSchema = (url: string, query: string) => {
    return axios.post(url, {
        query: query
    })
}

export { convert };
