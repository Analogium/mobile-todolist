import { AdMob, BannerAdSize, BannerAdPosition, BannerAdPluginEvents } from '@capacitor-community/admob';
import type { AdMobBannerSize } from '@capacitor-community/admob';
import type { BannerAdOptions } from '@capacitor-community/admob';


export async function banner(): Promise<void> {
    const { status } = await AdMob.trackingAuthorizationStatus();

    if (status === 'notDetermined') {
        /**
         * If you want to explain TrackingAuthorization before showing the iOS dialog,
         * you can show the modal here.
         * ex)
         * const modal = await this.modalCtrl.create({
         *   component: RequestTrackingPage,
         * });
         * await modal.present();
         * await modal.onDidDismiss();  // Wait for close modal
         **/
    }

    AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: ['B6E96AABC0C0BF4DB3011F93499ABC53'],
        initializeForTesting: true,
    });

    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
        // Subscribe Banner Event Listener
    });

    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
        // Subscribe Change Banner Size
    });

    const options: BannerAdOptions = {
        adId: 'ca-app-pub-3940256099942544/6300978111',
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.TOP_CENTER,
        margin: 0,
        // isTesting: true
        // npa: true
    };
    AdMob.showBanner(options);
}