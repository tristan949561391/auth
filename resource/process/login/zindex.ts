/**
 * Created by Tristan on 16/10/2.
 */
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);