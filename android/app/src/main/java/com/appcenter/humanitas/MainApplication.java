package com.appcenter.humanitas;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.futurepress.staticserver.FPStaticServerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.tanguyantoine.react.MusicControl;
import com.rnziparchive.RNZipArchivePackage;
// import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import cl.json.RNSharePackage;
import com.github.yamill.orientation.OrientationPackage;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new GoogleAnalyticsBridgePackage(),
            new FPStaticServerPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new MusicControl(),
            new RNZipArchivePackage(),
            new SplashScreenReactPackage(),
            new RNSharePackage(),
            new OrientationPackage(),
            new RNFSPackage(),
            new RNFetchBlobPackage(),
            new ReactNativeI18n()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
