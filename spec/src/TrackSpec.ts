
/// <reference path="../../typings/jasmine.d.ts" />

import Track from '../../src/Track';
import ITrackData from '../../src/ITrackData';

describe('Track', () => {
  let track: Track;
  let audio: HTMLAudioElement;
  let trackData: ITrackData = {
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
    track = new Track(trackData);
    audio = new Audio();
  };

  it('should sort stream urls', () => {
    beforeEach();
    track.orderStreamUrls(audio);

  });
});

