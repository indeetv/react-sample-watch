
    export const endpoints =  {
        "watch.meta.product.retrieve": "https://qa8-api.devtest.indee.tv/v2/watch/meta/product-config",
        "watch.meta.feature_support": "https://qa8-api.devtest.indee.tv/v2/watch/meta/feature-support",
        "watch.auth.user.signup": "https://qa8-api.devtest.indee.tv/v2/watch/auth/sign-up",
        "watch.auth.user.resend_verification": "https://qa8-api.devtest.indee.tv/v2/watch/auth/resend-verification-email",
        "watch.auth.session.login": "https://qa8-api.devtest.indee.tv/v2/watch/auth/login",
        "watch.auth.session.refresh": "https://qa8-api.devtest.indee.tv/v2/watch/auth/token/refresh",
        "watch.auth.session.logout": "https://qa8-api.devtest.indee.tv/v2/watch/auth/logout",
        "watch.auth.session.qr.get_login_code": "https://qa8-api.devtest.indee.tv/v2/watch/auth/login/qr/get-code",
        "watch.auth.session.qr.login": "https://qa8-api.devtest.indee.tv/v2/watch/auth/login/qr",
        "watch.auth.session.qr.get_token": "https://qa8-api.devtest.indee.tv/v2/watch/auth/login/qr/get-token",
        "watch.auth.password.forgot_password": "https://qa8-api.devtest.indee.tv/v2/watch/auth/forgot-password",
        "watch.auth.password.reset_password": "https://qa8-api.devtest.indee.tv/v2/watch/auth/reset-password",
        "watch.content.brand.list": "https://qa8-api.devtest.indee.tv/v2/watch/content/brands",
        "watch.content.brand.retrieve": "https://qa8-api.devtest.indee.tv/v2/watch/content/brands/<str:brand_key>",
        "watch.content.project.list": "https://qa8-api.devtest.indee.tv/v2/watch/content/projects",
        "watch.content.genre.list": "https://qa8-api.devtest.indee.tv/v2/watch/content/genres",
        "watch.content.carousel_image.list": "https://qa8-api.devtest.indee.tv/v2/watch/content/carousel-images",
        "watch.content.swimlane.list": "https://qa8-api.devtest.indee.tv/v3/watch/content/swimlanes",
        "watch.content.videos.list": "https://qa8-api.devtest.indee.tv/v2/watch/content/projects/<str:project_key>/videos",
        "watch.content.project.retrieve": "https://qa8-api.devtest.indee.tv/v2/watch/content/projects/<str:project_key>",
        "watch.content.project_extra.list": "https://qa8-api.devtest.indee.tv/v2/watch/content/projects/<str:project_key>/extras",
        "watch.content.video.retrieve": "https://qa8-api.devtest.indee.tv/v2/watch/content/projects/<str:project_key>/videos/<str:video_key>",
        "watch.content.screener_room.retrieve": "https://qa8-api.devtest.indee.tv/v2/content/screener-rooms/<str:screener_room_key>",
        "watch.content.screener_room_video.list": "https://qa8-api.devtest.indee.tv/v2/content/screener-rooms/<str:screener_room_key>/videos",
        "watch.content.screener.2fa": "https://qa8-api.devtest.indee.tv/v2/watch/content/screeners/<str:screener_key>/2fa",
        "watch.content.screener.reactivate": "https://qa8-api.devtest.indee.tv/v2/watch/content/screeners/<str:screener_key>/reactivate",
        "watch.content.watchlist_project.add": "https://qa8-api.devtest.indee.tv/v2/watch/content/watchlist/projects",
        "watch.content.watchlist_project.list": "https://qa8-api.devtest.indee.tv/v2/watch/content/watchlist/projects",
        "watch.content.watchlist_project.delete": "https://qa8-api.devtest.indee.tv/v2/watch/content/watchlist/projects/<str:project_key>",
        "watch.stream.session.playback": "https://qa8-api.devtest.indee.tv/v2/watch/stream/<str:screener_key>/playback",
        "watch.stream.session.record_offline_views": "https://qa8-api.devtest.indee.tv/v2/watch/stream/<str:screener_key>/offline-views",
        "watch.stream.view_engagement.record": "https://qa8-api.devtest.indee.tv/v2/watch/stream/view-engagement",
        "watch.stream.player_component.retrieve": "https://qa8-api.devtest.indee.tv/v2/watch/stream/player/view",
        "watch.stream.player_function.retrieve": "https://qa8-api.devtest.indee.tv/v2/watch/stream/player/init",
        "watch.content.swimlane.project.list": "https://qa8-api.devtest.indee.tv/v3/watch/content/swimlanes/<str:swimlane_key>/projects"
    }






