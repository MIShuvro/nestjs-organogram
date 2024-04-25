import { DEFAULT_STREAM_IMG_TYPE } from '@common/utils/default-stream-img-type';
import { AppConfigService } from '@common/app-config/service/app-config.service';
import { LiveClass } from '../../api/liveclass/entity/liveclass.entity';
import { LIVE_SOURCE } from '@common/utils/live-source';

export function concatObject(obj: Object, separator: string = ', ') {
  return Object.keys(obj)
    .map(function (key, index) {
      return obj[key];
    })
    .join(separator);
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getUserConnectionPingUrl() {
  return 'https://dev-api.10minuteschool.com/user-activity-service';
}

export function getLiveClassDurationUpToNow(startAt: Date): number {
  return Date.now() - startAt.getTime();
}

export function getLiveClassDefaultImages(streamImageUrl?: string) {
  return [
    {
      type: DEFAULT_STREAM_IMG_TYPE.DEFAULT_STREAM,
      url: streamImageUrl ? streamImageUrl : AppConfigService.appConfig.TECHNICAL_PAUSE_IMG_URL
    },
    {
      type: DEFAULT_STREAM_IMG_TYPE.DOUBT,
      url: AppConfigService.appConfig.DOUBT_STREAM_IMG_URL
    }
  ];
}

export function getEventAtMS(liveClassStartAt: Date): number {
  return new Date().getTime() - liveClassStartAt.getTime() + AppConfigService.appConfig.EVENT_AT_PADDING_IN_MS;
}

export function getLiveClassTotalDuration(liveClass: LiveClass): number {
  let totalClassDuration = 0;
  if (liveClass.source === LIVE_SOURCE.CHIME) {
    totalClassDuration = liveClass.stream_end_at.getTime() - liveClass.start.getTime();
  } else {
    totalClassDuration = liveClass.stream_end_at.getTime() - liveClass.stream_start_at.getTime();
  }
  return totalClassDuration;
}

export function appendTimeToUrl(url: string) {
  return `${url}?t=${Date.now()}`;
}
