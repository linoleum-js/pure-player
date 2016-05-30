
/// <reference path="../../typings/jasmine.d.ts" />

import Track from '../../src/Track';
import ITrackData from '../../src/ITrackData';


const copy = (data): any => {
  return JSON.parse(JSON.stringify(data));
};

describe('Track', () => {
  let track: Track;
  let audio: HTMLAudioElement;
  let trackData: ITrackData = {
    title: '123',
    streamUrlList: [{
      type: 'audio/vsdvsdv',
      url: 'notfound1'
    }, {
      type: 'audio/ogg',
      url: 'notfound2'
    }, {
      type: 'audio/mp3',
      url: 'http://download.wavetlan.com/SVV/Media/HTTP/MP3/Helix_Mobile_Producer/HelixMobileProducer_test1_MPEG2_Mono_CBR_40kbps_16000Hz.mp3'
    }, {
      type: 'audio/wav',
      url: 'notfound3'
    }, {
      type: 'audio/grgerg',
      url: 'notfound4'
    }]
  };

  let beforeEach = () => {
    track = new Track(copy(trackData));
    audio = new Audio();
  };

  it('should sort stream urls', () => {
    beforeEach();
    track.orderStreamUrls(audio);
    // chrome-specific, may fail in other browsers
    expect(track.getStreamUrl()).toBe('http://download.wavetlan.com/SVV/Media/HTTP/MP3/Helix_Mobile_Producer/HelixMobileProducer_test1_MPEG2_Mono_CBR_40kbps_16000Hz.mp3');
  });

  it('should use next url if any', () => {
    beforeEach();
    expect(track.getStreamUrl()).toBe('notfound1');
    track.nextUrl();
    expect(track.getStreamUrl()).toBe('notfound2');
    expect(track.hasMoreUrls()).toBe(true);
    track.nextUrl();
    track.nextUrl();
    track.nextUrl();
    track.nextUrl();
    expect(track.hasMoreUrls()).toBe(false);
  });
});

