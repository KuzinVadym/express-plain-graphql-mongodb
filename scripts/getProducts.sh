curl --request POST \
  --url http://127.0.0.1:3333/graphql \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --data '{"query":"{\n  products{\n    _id,\n    name,\n\t\tproducer{\n\t\t\tname\n\t\t}\n  }\n}"}'