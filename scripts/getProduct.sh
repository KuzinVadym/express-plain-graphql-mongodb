curl --request POST \
  --url http://localhost:3333/graphql \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --data '{"query":"{\n  product(
  _id: \"6670a3450bea5209f74eb62c\"){\n    
  _id,\n    name,\n\t\tproducerId,\n\t\tproducer{\n\t\t\t_id\n\t\t\tname\n\t\t\tcountry\n\t\t\tregion\n\t\t}\n  }\n}"}'