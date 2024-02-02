import { WebMethods } from "src/config/Method";

// ----------------------------------------------------------------------
let loginInfo = WebMethods.GetLoginInfo()
export const account = {
  displayName: 'Admin',
  email: loginInfo?.email,
  photoURL: 'https://as2.ftcdn.net/v2/jpg/04/32/89/63/1000_F_432896398_99o08tTgBYj8YP2eatvF4zaJu3AdF40E.jpg',
};