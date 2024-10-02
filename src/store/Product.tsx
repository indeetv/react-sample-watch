import React, { useState, createContext } from "react";
import {
  ProductContextType,
  ProductProviderProps,
  ProductConfigType,
} from "../types/product";
import { myFetch } from "../lib/myFetch";

const ProductContext = createContext<ProductContextType>({
  authType: "",
  key: "",
  signupAllowed: false,
  getMetaConfig: async () => {},
  getProductConfig: async () => {},
});

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const api = new myFetch();

  //store variables
  const [endpointSet,setEndpointSet] = useState({
    "endpoints": {
        "watch.meta.product.retrieve": "http://localhost:8000/v2/watch/meta/product-config",
        "watch.meta.feature_support": "http://localhost:8000/v2/watch/meta/feature-support",
        "watch.auth.user.signup": "http://localhost:8000/v2/watch/auth/sign-up",
        "watch.auth.session.login": "http://localhost:8000/v2/watch/auth/login",
        "watch.auth.session.refresh": "http://localhost:8000/v2/watch/auth/token/refresh",
        "watch.auth.session.logout": "http://localhost:8000/v2/watch/auth/logout",
        "watch.auth.session.qr.get_login_code": "http://localhost:8000/v2/watch/auth/login/qr/get-code",
        "watch.auth.session.qr.login": "http://localhost:8000/v2/watch/auth/login/qr",
        "watch.auth.session.qr.get_token": "http://localhost:8000/v2/watch/auth/login/qr/get-token",
        "watch.auth.password.forgot_password": "http://localhost:8000/v2/watch/auth/forgot-password",
        "watch.auth.password.reset_password": "http://localhost:8000/v2/watch/auth/reset-password",
        "watch.content.brand.list": "http://localhost:8000/v2/watch/content/brands",
        "watch.content.brand.retrieve": "http://localhost:8000/v2/watch/content/brands/<str:brand_key>",
        "watch.content.project.list": "http://localhost:8000/v2/watch/content/projects",
        "watch.content.genre.list": "http://localhost:8000/v2/watch/content/genres",
        "watch.content.carousel_image.list": "http://localhost:8000/v2/watch/content/carousel-images",
        "watch.content.swimlane.list": "http://localhost:8000/v3/watch/content/swimlanes",
        "watch.content.videos.list": "http://localhost:8000/v2/watch/content/projects/<str:project_key>/videos",
        "watch.content.project.retrieve": "http://localhost:8000/v2/watch/content/projects/<str:project_key>",
        "watch.content.project_extra.list": "http://localhost:8000/v2/watch/content/projects/<str:project_key>/extras",
        "watch.content.video.retrieve": "http://localhost:8000/v2/watch/content/projects/<str:project_key>/videos/<str:video_key>",
        "watch.content.screener_room.retrieve": "http://localhost:8000/v2/content/screener-rooms/<str:screener_room_key>",
        "watch.content.screener_room_video.list": "http://localhost:8000/v2/content/screener-rooms/<str:screener_room_key>/videos",
        "watch.content.screener.2fa": "http://localhost:8000/v2/watch/content/screeners/<str:screener_key>/2fa",
        "watch.content.screener.reactivate": "http://localhost:8000/v2/watch/content/screeners/<str:screener_key>/reactivate",
        "watch.content.watchlist_project.add": "http://localhost:8000/v2/watch/content/watchlist/projects",
        "watch.content.watchlist_project.list": "http://localhost:8000/v2/watch/content/watchlist/projects",
        "watch.content.watchlist_project.delete": "http://localhost:8000/v2/watch/content/watchlist/projects/<str:project_key>",
        "watch.stream.session.playback": "http://localhost:8000/v2/watch/stream/<str:screener_key>/playback",
        "watch.stream.view_engagement.record": "http://localhost:8000/v2/watch/stream/view-engagement",
        "watch.stream.player_component.retrieve": "http://localhost:8000/v2/watch/stream/player/view",
        "watch.stream.player_function.retrieve": "http://localhost:8000/v2/watch/stream/player/init",
        "watch.content.swimlane.project.list": "http://localhost:8000/v3/watch/content/swimlanes/<str:swimlane_key>/projects"
    },
    "host": {
        "name": "http://localhost:8000/"
    },
    "status_code": "W0000"
})
  const [authType, setAuthType] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [signupAllowed, setSignupAllowed] = useState<boolean>(false);
  //store methods
  const getMetaConfig = async (): Promise<void> => {
    const data = await api.get("setup/meta-config");
    console.log("meta config", data);
  };

  const getProductConfig = async (): Promise<void> => {
    const { auth_type, singup_allowed, key } = (await api.get(
      "meta/product-config"
    )) as ProductConfigType;
    setAuthType(auth_type);
    setKey(key);
    setSignupAllowed(singup_allowed);
  };

  return (
    <ProductContext.Provider
      value={{ authType, key, signupAllowed, getProductConfig, getMetaConfig }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export { ProductContext };
