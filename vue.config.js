module.exports = {
    publicPath: '/',
    pwa: {
        name: 'code-sport',
        themeColor: '#0E7490',
        msTileColor: '#404040',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#0E7490',

        manifestOptions: {
            name: 'Code Sport',
            short_name: 'code-sport',
            description: 'Football competition information',
            orientation: 'any',
            display: 'standalone',
            start_url: '/',
            background_color: '#404040',
            theme_color: '#0E7490',
        },
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.js',
            exclude: [/\.map$/],
        },
    },
};
