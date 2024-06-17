curl --request POST \
  --url http://127.0.0.1:3333/graphql \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --data '{"query":"mutation{\n\tcreateProducts(input: [{\n\t\tname: \"Chateau Rose\",\n    vintage: \"2023\",\n    producerId: \"6670b9ef32ebec5e6bf76b6e\"\n\t}]){\n\t_id\n  name,\n  vintage,\n  producerId\n}}"}'