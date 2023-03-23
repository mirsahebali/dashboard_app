import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import * as Realm from "realm-web"
const app = new Realm.App("dasboard-ieeed");
async function getValidAccessToken() {
  if (!app.currentUser) {
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    await app.currentUser.refreshAccessToken();
  }
  return app!.currentUser!.accessToken;
}
const client = new ApolloClient({
    link: new HttpLink({uri: "https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/dasboard-ieeed/graphql",
    fetch: async (uri, options) => {
          const accessToken = await getValidAccessToken();
          const headersInit: HeadersInit = {}

options!.headers = headersInit
          options!.headers!.Authorization = `Bearer ${accessToken}`;
          return fetch(uri, options);    
    }}),
    cache: new InMemoryCache(),
});

export default client;