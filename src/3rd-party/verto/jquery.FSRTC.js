/*
 * Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
 * Copyright (C) 2005-2014, Anthony Minessale II <anthm@freeswitch.org>
 *
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
 *
 * The Initial Developer of the Original Code is
 * Anthony Minessale II <anthm@freeswitch.org>
 * Portions created by the Initial Developer are Copyright (C)
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Anthony Minessale II <anthm@freeswitch.org>
 *
 * jquery.FSRTC.js - WebRTC Glue code
 *
 */

(function ($) {
  // Find the line in sdpLines that starts with |prefix|, and, if specified,
  // contains |substr| (case-insensitive search).
  function findLine(sdpLines, prefix, substr) {
    return findLineInRange(sdpLines, 0, -1, prefix, substr);
  }

  // Find the line in sdpLines[startLine...endLine - 1] that starts with |prefix|
  // and, if specified, contains |substr| (case-insensitive search).
  function findLineInRange(sdpLines, startLine, endLine, prefix, substr) {
    const realEndLine = endLine != -1 ? endLine : sdpLines.length;
    for (let i = startLine; i < realEndLine; ++i) {
      if (sdpLines[i].indexOf(prefix) === 0) {
        if (!substr || sdpLines[i].toLowerCase().indexOf(substr.toLowerCase()) !== -1) {
          return i;
        }
      }
    }
    return null;
  }

  // Gets the codec payload type from an a=rtpmap:X line.
  function getCodecPayloadType(sdpLine) {
    const pattern = new RegExp('a=rtpmap:(\\d+) \\w+\\/\\d+');
    const result = sdpLine.match(pattern);
    return result && result.length == 2 ? result[1] : null;
  }

  // Returns a new m= line with the specified codec as the first one.
  function setDefaultCodec(mLine, payload) {
    const elements = mLine.split(' ');
    const newLine = [];
    let index = 0;
    for (let i = 0; i < elements.length; i++) {
      if (index === 3) {
        // Format of media starts from the fourth.
        newLine[index++] = payload; // Put target payload to the first.
      }
      if (elements[i] !== payload) newLine[index++] = elements[i];
    }
    return newLine.join(' ');
  }

  $.FSRTC = function (options) {
    this.options = $.extend(
      {
        useVideo: null,
        useStereo: false,
        userData: null,
        localVideo: null,
        screenShare: false,
        useCamera: 'any',
        iceServers: false,
        videoParams: {},
        audioParams: {},
        callbacks: {
          onICEComplete() {},
          onICE() {},
          onOfferSDP() {},
        },
      },
      options,
    );

    this.audioEnabled = true;
    this.videoEnabled = true;

    this.mediaData = {
      SDP: null,
      profile: {},
      candidateList: [],
    };

    if (moz) {
      this.constraints = {
        offerToReceiveAudio: this.options.useSpeak !== 'none',
        offerToReceiveVideo: !!this.options.useVideo,
      };
    } else {
      this.constraints = {
        optional: [
          {
            DtlsSrtpKeyAgreement: 'true',
          },
        ],
        mandatory: {
          OfferToReceiveAudio: this.options.useSpeak !== 'none',
          OfferToReceiveVideo: !!this.options.useVideo,
        },
      };
    }

    if (self.options.useVideo) {
      self.options.useVideo.style.display = 'none';
    }

    setCompat();
    checkCompat();
  };

  $.FSRTC.validRes = [];

  $.FSRTC.prototype.useVideo = function (obj, local) {
    const self = this;

    if (obj) {
      self.options.useVideo = obj;
      self.options.localVideo = local;
      if (moz) {
        self.constraints.offerToReceiveVideo = true;
      } else {
        self.constraints.mandatory.OfferToReceiveVideo = true;
      }
    } else {
      self.options.useVideo = null;
      self.options.localVideo = null;
      if (moz) {
        self.constraints.offerToReceiveVideo = false;
      } else {
        self.constraints.mandatory.OfferToReceiveVideo = false;
      }
    }

    if (self.options.useVideo) {
      self.options.useVideo.style.display = 'none';
    }
  };

  $.FSRTC.prototype.useStereo = function (on) {
    const self = this;
    self.options.useStereo = on;
  };

  // Sets Opus in stereo if stereo is enabled, by adding the stereo=1 fmtp param.
  $.FSRTC.prototype.stereoHack = function (sdp) {
    const self = this;

    if (!self.options.useStereo) {
      return sdp;
    }

    const sdpLines = sdp.split('\r\n');

    // Find opus payload.
    let opusIndex = findLine(sdpLines, 'a=rtpmap', 'opus/48000'),
      opusPayload;

    if (!opusIndex) {
      return sdp;
    }
    opusPayload = getCodecPayloadType(sdpLines[opusIndex]);

    // Find the payload in fmtp line.
    const fmtpLineIndex = findLine(sdpLines, `a=fmtp:${opusPayload.toString()}`);

    if (fmtpLineIndex === null) {
      // create an fmtp line
      sdpLines[opusIndex] = `${sdpLines[
        opusIndex
      ]}\r\na=fmtp:${opusPayload.toString()} stereo=1; sprop-stereo=1`;
    } else {
      // Append stereo=1 to fmtp line.
      sdpLines[fmtpLineIndex] = sdpLines[fmtpLineIndex].concat('; stereo=1; sprop-stereo=1');
    }

    sdp = sdpLines.join('\r\n');
    return sdp;
  };

  function setCompat() {
    $.FSRTC.moz = !!navigator.mozGetUserMedia;
    // navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia);
    if (!navigator.getUserMedia) {
      navigator.getUserMedia =
        navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;
    }
  }

  function checkCompat() {
    if (!navigator.getUserMedia) {
      alert('This application cannot function in this browser.');
      return false;
    }
    return true;
  }

  function onStreamError(self, e) {
    console.log(
      'There has been a problem retrieving the streams - did you allow access? Check Device Resolution',
      e,
    );
    doCallback(self, 'onError', e);
  }

  function onStreamSuccess(self, stream) {
    console.log('Stream Success');
    doCallback(self, 'onStream', stream);
  }

  function onICE(self, candidate) {
    self.mediaData.candidate = candidate;
    self.mediaData.candidateList.push(self.mediaData.candidate);

    doCallback(self, 'onICE');
  }

  function doCallback(self, func, arg) {
    if (func in self.options.callbacks) {
      self.options.callbacks[func](self, arg);
    }
  }

  function onICEComplete(self, candidate) {
    console.log('ICE Complete');
    doCallback(self, 'onICEComplete');
  }

  function onChannelError(self, e) {
    console.error('Channel Error', e);
    doCallback(self, 'onError', e);
  }

  function onICESDP(self, sdp) {
    self.mediaData.SDP = self.stereoHack(sdp.sdp);
    console.log('ICE SDP');
    doCallback(self, 'onICESDP');
  }

  function onAnswerSDP(self, sdp) {
    self.answer.SDP = self.stereoHack(sdp.sdp);
    console.log('ICE ANSWER SDP');
    doCallback(self, 'onAnswerSDP', self.answer.SDP);
  }

  function onMessage(self, msg) {
    console.log('Message');
    doCallback(self, 'onICESDP', msg);
  }

  function onRemoteStream(self, stream) {
    if (self.options.useVideo) {
      self.options.useVideo.style.display = 'block';
    }

    const element = self.options.useAudio;
    console.log('REMOTE STREAM', stream, element);

    if (typeof element.srcObject !== 'undefined') {
      element.srcObject = stream;
    } else if (typeof element.mozSrcObject !== 'undefined') {
      element.mozSrcObject = stream;
    } else if (typeof element.src !== 'undefined') {
      element.src = URL.createObjectURL(stream);
    } else {
      console.error('Error attaching stream to element.');
    }

    self.options.useAudio.play();
    self.remoteStream = stream;
  }

  function onOfferSDP(self, sdp) {
    self.mediaData.SDP = self.stereoHack(sdp.sdp);
    console.log('Offer SDP');
    doCallback(self, 'onOfferSDP');
  }

  $.FSRTC.prototype.answer = function (sdp, onSuccess, onError) {
    this.peer.addAnswerSDP(
      {
        type: 'answer',
        sdp,
      },
      onSuccess,
      onError,
    );
  };

  $.FSRTC.prototype.stopPeer = function () {
    if (self.peer) {
      console.log('stopping peer');
      self.peer.stop();
    }
  };

  $.FSRTC.prototype.stop = function () {
    const self = this;

    if (self.options.useVideo) {
      self.options.useVideo.style.display = 'none';
      if (moz) {
        self.options.useVideo.mozSrcObject = null;
      } else {
        self.options.useVideo.src = '';
      }
    }

    if (self.localStream) {
      if (typeof self.localStream.stop === 'function') {
        self.localStream.stop();
      } else if (self.localStream.active) {
        var tracks = self.localStream.getTracks();
        console.error(tracks);
        tracks.forEach((track, index) => {
          console.log(track);
          track.stop();
        });
      }
      self.localStream = null;
    }

    if (self.options.localVideo) {
      self.options.localVideo.style.display = 'none';
      if (moz) {
        self.options.localVideo.mozSrcObject = null;
      } else {
        self.options.localVideo.src = '';
      }
    }

    if (self.options.localVideoStream) {
      if (typeof self.options.localVideoStream.stop === 'function') {
        self.options.localVideoStream.stop();
      } else if (self.options.localVideoStream.active) {
        var tracks = self.options.localVideoStream.getTracks();
        console.error(tracks);
        tracks.forEach((track, index) => {
          console.log(track);
          track.stop();
        });
      }
    }

    if (self.peer) {
      console.log('stopping peer');
      self.peer.stop();
    }
  };

  $.FSRTC.prototype.getMute = function () {
    const self = this;
    return self.audioEnabled;
  };

  $.FSRTC.prototype.setMute = function (what) {
    const self = this;
    const audioTracks = self.localStream.getAudioTracks();

    for (let i = 0, len = audioTracks.length; i < len; i++) {
      switch (what) {
        case 'on':
          audioTracks[i].enabled = true;
          break;
        case 'off':
          audioTracks[i].enabled = false;
          break;
        case 'toggle':
          audioTracks[i].enabled = !audioTracks[i].enabled;
        default:
          break;
      }

      self.audioEnabled = audioTracks[i].enabled;
    }

    return !self.audioEnabled;
  };

  $.FSRTC.prototype.getVideoMute = function () {
    const self = this;
    return self.videoEnabled;
  };

  $.FSRTC.prototype.setVideoMute = function (what) {
    const self = this;
    const videoTracks = self.localStream.getVideoTracks();

    for (let i = 0, len = videoTracks.length; i < len; i++) {
      switch (what) {
        case 'on':
          videoTracks[i].enabled = true;
          break;
        case 'off':
          videoTracks[i].enabled = false;
          break;
        case 'toggle':
          videoTracks[i].enabled = !videoTracks[i].enabled;
        default:
          break;
      }

      self.videoEnabled = videoTracks[i].enabled;
    }

    return !self.videoEnabled;
  };

  $.FSRTC.prototype.createAnswer = function (params) {
    const self = this;
    self.type = 'answer';
    self.remoteSDP = params.sdp;
    console.debug('inbound sdp: ', params.sdp);

    function onSuccess(stream) {
      self.localStream = stream;

      self.peer = RTCPeerConnection({
        type: self.type,
        attachStream: self.localStream,
        onICE(candidate) {
          return onICE(self, candidate);
        },
        onICEComplete() {
          return onICEComplete(self);
        },
        onRemoteStream(stream) {
          return onRemoteStream(self, stream);
        },
        onICESDP(sdp) {
          return onICESDP(self, sdp);
        },
        onChannelError(e) {
          return onChannelError(self, e);
        },
        constraints: self.constraints,
        iceServers: self.options.iceServers,
        offerSDP: {
          type: 'offer',
          sdp: self.remoteSDP,
        },
      });

      onStreamSuccess(self);
    }

    function onError(e) {
      onStreamError(self, e);
    }

    const mediaParams = getMediaParams(self);

    console.log('Audio constraints', mediaParams.audio);
    console.log('Video constraints', mediaParams.video);

    if (self.options.useVideo && self.options.localVideo) {
      getUserMedia({
        constraints: {
          audio: false,
          video: {
            mandatory: self.options.videoParams,
            optional: [],
          },
        },
        localVideo: self.options.localVideo,
        onsuccess(e) {
          self.options.localVideoStream = e;
          console.log('local video ready');
        },
        onerror(e) {
          console.error('local video error!');
        },
      });
    }

    getUserMedia({
      constraints: {
        audio: mediaParams.audio,
        video: mediaParams.video,
      },
      video: mediaParams.useVideo,
      onsuccess: onSuccess,
      onerror: onError,
    });
  };

  function getMediaParams(obj) {
    let audio;

    if (obj.options.useMic && obj.options.useMic === 'none') {
      console.log('Microphone Disabled');
      audio = false;
    } else if (obj.options.videoParams && obj.options.screenShare) {
      // obj.options.videoParams.chromeMediaSource == 'desktop') {

      // obj.options.videoParams = {
      //	chromeMediaSource: 'screen',
      //	maxWidth:screen.width,
      //	maxHeight:screen.height
      //	chromeMediaSourceId = sourceId;
      //  };

      console.error('SCREEN SHARE');
      audio = false;
    } else {
      audio = {
        mandatory: {},
        optional: [],
      };

      if (obj.options.useMic !== 'any') {
        audio.optional = [{ sourceId: obj.options.useMic }];
      }

      if (obj.options.audioParams) {
        for (const key in obj.options.audioParams) {
          const con = {};
          con[key] = obj.options.audioParams[key];
          audio.optional.push(con);
        }
      }
    }

    if (obj.options.useVideo && obj.options.localVideo) {
      getUserMedia({
        constraints: {
          audio: false,
          video: {
            mandatory: obj.options.videoParams,
            optional: [],
          },
        },
        localVideo: obj.options.localVideo,
        onsuccess(e) {
          self.options.localVideoStream = e;
          console.log('local video ready');
        },
        onerror(e) {
          console.error('local video error!');
        },
      });
    }

    let video = {};
    const bestFrameRate = obj.options.videoParams.vertoBestFrameRate;
    delete obj.options.videoParams.vertoBestFrameRate;

    video = {
      mandatory: obj.options.videoParams,
      optional: [],
    };

    let useVideo = obj.options.useVideo;

    if (useVideo && obj.options.useCamera && obj.options.useCamera !== 'none') {
      if (!video.optional) {
        video.optional = [];
      }

      if (obj.options.useCamera !== 'any') {
        video.optional.push({ sourceId: obj.options.useCamera });
      }

      if (bestFrameRate) {
        video.optional.push({ minFrameRate: bestFrameRate });
        video.optional.push({ maxFrameRate: bestFrameRate });
      }
    } else {
      console.log('Camera Disabled');
      console.log('useVideo && obj.options.useCamera && obj.options.useCamera:', obj);
      video = false;
      useVideo = false;
    }

    return { audio, video, useVideo };
  }

  $.FSRTC.prototype.call = function (profile) {
    checkCompat();

    const self = this;
    let screen = false;

    self.type = 'offer';

    if (self.options.videoParams && self.options.screenShare) {
      // self.options.videoParams.chromeMediaSource == 'desktop') {
      screen = true;
    }

    function onSuccess(stream) {
      self.localStream = stream;

      if (screen) {
        if (moz) {
          self.constraints.OfferToReceiveVideo = false;
        } else {
          self.constraints.mandatory.OfferToReceiveVideo = false;
        }
      }

      self.peer = RTCPeerConnection({
        type: self.type,
        attachStream: self.localStream,
        onICE(candidate) {
          return onICE(self, candidate);
        },
        onICEComplete() {
          return onICEComplete(self);
        },
        onRemoteStream: screen
          ? function (stream) {}
          : function (stream) {
            return onRemoteStream(self, stream);
          },
        onOfferSDP(sdp) {
          return onOfferSDP(self, sdp);
        },
        onICESDP(sdp) {
          return onICESDP(self, sdp);
        },
        onChannelError(e) {
          return onChannelError(self, e);
        },
        constraints: self.constraints,
        iceServers: self.options.iceServers,
      });

      onStreamSuccess(self, stream);
    }

    function onError(e) {
      onStreamError(self, e);
    }

    const mediaParams = getMediaParams(self);

    console.log('Audio constraints', mediaParams.audio);
    console.log('Video constraints', mediaParams.video);

    if (mediaParams.audio || mediaParams.video) {
      getUserMedia({
        constraints: {
          audio: mediaParams.audio,
          video: mediaParams.video,
        },
        video: mediaParams.useVideo,
        onsuccess: onSuccess,
        onerror: onError,
      });
    } else {
      onSuccess(null);
    }

    /*
        navigator.getUserMedia({
            video: self.options.useVideo,
            audio: true
        }, onSuccess, onError);
        */
  };

  // DERIVED from RTCPeerConnection-v1.5
  // 2013, @muazkh - github.com/muaz-khan
  // MIT License - https://www.webrtc-experiment.com/licence/
  // Documentation - https://github.com/muaz-khan/WebRTC-Experiment/tree/master/RTCPeerConnection
  window.moz = !!navigator.mozGetUserMedia;

  function RTCPeerConnection(options) {
    let gathering = false,
      done = false;

    let w = window,
      PeerConnection = w.mozRTCPeerConnection || w.webkitRTCPeerConnection,
      SessionDescription = w.mozRTCSessionDescription || w.RTCSessionDescription,
      IceCandidate = w.mozRTCIceCandidate || w.RTCIceCandidate;

    const STUN = {
      url: !moz ? 'stun:stun.l.google.com:19302' : 'stun:23.21.150.121',
    };

    let iceServers = null;

    if (options.iceServers) {
      let tmp = options.iceServers;

      if (typeof tmp === 'boolean') {
        tmp = null;
      }

      if (tmp && !(typeof tmp === 'object' && tmp.constructor === Array)) {
        console.warn('iceServers must be an array, reverting to default ice servers');
        tmp = null;
      }

      iceServers = {
        iceServers: tmp || [STUN],
      };

      if (!moz && !tmp) {
        iceServers.iceServers = [STUN];
      }
    }

    const optional = {
      optional: [],
    };

    if (!moz) {
      optional.optional = [
        {
          DtlsSrtpKeyAgreement: true,
        },
        {
          RtpDataChannels: !!options.onChannelMessage,
        },
      ];
    }

    const peer = new PeerConnection(iceServers, optional);

    openOffererChannel();
    const x = 0;

    function ice_handler() {
      done = true;
      gathering = null;

      if (options.onICEComplete) {
        options.onICEComplete();
      }

      if (options.type == 'offer') {
        if (
          !moz ||
          (!options.sentICESDP &&
            peer.localDescription.sdp.match(/a=candidate/) &&
            !x &&
            options.onICESDP)
        ) {
          options.onICESDP(peer.localDescription);
          // x = 1;
          /*
                      x = 1;
                      peer.createOffer(function(sessionDescription) {
                      sessionDescription.sdp = serializeSdp(sessionDescription.sdp);
                      peer.setLocalDescription(sessionDescription);
                      if (options.onICESDP) {
                      options.onICESDP(sessionDescription);
                      }
                      }, onSdpError, constraints);
                    */
        }
      } else if (!x && options.onICESDP) {
        options.onICESDP(peer.localDescription);
        // x = 1;
        /*
                      x = 1;
                      peer.createAnswer(function(sessionDescription) {
                      sessionDescription.sdp = serializeSdp(sessionDescription.sdp);
                      peer.setLocalDescription(sessionDescription);
                      if (options.onICESDP) {
                      options.onICESDP(sessionDescription);
                      }
                      }, onSdpError, constraints);
                    */
      }
    }

    peer.onicecandidate = function (event) {
      if (done) {
        return;
      }

      if (!gathering) {
        gathering = setTimeout(ice_handler, 1000);
      }

      if (event) {
        if (event.candidate) {
          options.onICE(event.candidate);
        }
      } else {
        done = true;

        if (gathering) {
          clearTimeout(gathering);
          gathering = null;
        }

        ice_handler();
      }
    };

    // attachStream = MediaStream;
    if (options.attachStream) peer.addStream(options.attachStream);

    // attachStreams[0] = audio-stream;
    // attachStreams[1] = video-stream;
    // attachStreams[2] = screen-capturing-stream;
    if (options.attachStreams && options.attachStream.length) {
      const streams = options.attachStreams;
      for (let i = 0; i < streams.length; i++) {
        peer.addStream(streams[i]);
      }
    }

    peer.onaddstream = function (event) {
      const remoteMediaStream = event.stream;

      // onRemoteStreamEnded(MediaStream)
      remoteMediaStream.onended = function () {
        if (options.onRemoteStreamEnded) options.onRemoteStreamEnded(remoteMediaStream);
      };

      // onRemoteStream(MediaStream)
      if (options.onRemoteStream) options.onRemoteStream(remoteMediaStream);

      // console.debug('on:add:stream', remoteMediaStream);
    };

    const constraints = options.constraints || {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    };

    // onOfferSDP(RTCSessionDescription)
    function createOffer() {
      if (!options.onOfferSDP) return;

      peer.createOffer(
        (sessionDescription) => {
          sessionDescription.sdp = serializeSdp(sessionDescription.sdp);
          peer.setLocalDescription(sessionDescription);
          options.onOfferSDP(sessionDescription);
          /* old mozilla behaviour the SDP was already great right away */
          if (moz && options.onICESDP && sessionDescription.sdp.match(/a=candidate/)) {
            options.onICESDP(sessionDescription);
            options.sentICESDP = 1;
          }
        },
        onSdpError,
        constraints,
      );
    }

    // onAnswerSDP(RTCSessionDescription)
    function createAnswer() {
      if (options.type != 'answer') return;

      // options.offerSDP.sdp = addStereo(options.offerSDP.sdp);
      peer.setRemoteDescription(new SessionDescription(options.offerSDP), onSdpSuccess, onSdpError);
      peer.createAnswer(
        (sessionDescription) => {
          sessionDescription.sdp = serializeSdp(sessionDescription.sdp);
          peer.setLocalDescription(sessionDescription);
          if (options.onAnswerSDP) {
            options.onAnswerSDP(sessionDescription);
          }
        },
        onSdpError,
        constraints,
      );
    }

    // if Mozilla Firefox & DataChannel; offer/answer will be created later
    if ((options.onChannelMessage && !moz) || !options.onChannelMessage) {
      createOffer();
      createAnswer();
    }

    // DataChannel Bandwidth
    function setBandwidth(sdp) {
      // remove existing bandwidth lines
      sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, '');
      sdp = sdp.replace(/a=mid:data\r\n/g, 'a=mid:data\r\nb=AS:1638400\r\n');

      return sdp;
    }

    // old: FF<>Chrome interoperability management
    function getInteropSDP(sdp) {
      let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        extractedChars = '';

      function getChars() {
        extractedChars += chars[parseInt(Math.random() * 40)] || '';
        if (extractedChars.length < 40) getChars();

        return extractedChars;
      }

      // usually audio-only streaming failure occurs out of audio-specific crypto line
      // a=crypto:1 AES_CM_128_HMAC_SHA1_32 --------- kAttributeCryptoVoice
      if (options.onAnswerSDP) {
        sdp = sdp.replace(/(a=crypto:0 AES_CM_128_HMAC_SHA1_32)(.*?)(\r\n)/g, '');
      }

      // video-specific crypto line i.e. SHA1_80
      // a=crypto:1 AES_CM_128_HMAC_SHA1_80 --------- kAttributeCryptoVideo
      const inline = `${getChars()}\r\n${(extractedChars = '')}`;
      sdp = sdp.indexOf('a=crypto') == -1
        ? sdp.replace(/c=IN/g, `a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:${inline}c=IN`)
        : sdp;

      return sdp;
    }

    function serializeSdp(sdp) {
      // if (!moz) sdp = setBandwidth(sdp);
      // sdp = getInteropSDP(sdp);
      // console.debug(sdp);
      return sdp;
    }

    // DataChannel management
    let channel;

    function openOffererChannel() {
      if (!options.onChannelMessage || (moz && !options.onOfferSDP)) return;

      _openOffererChannel();

      if (!moz) return;
      navigator.mozGetUserMedia(
        {
          audio: true,
          fake: true,
        },
        (stream) => {
          peer.addStream(stream);
          createOffer();
        },
        useless,
      );
    }

    function _openOffererChannel() {
      channel = peer.createDataChannel(
        options.channel || 'RTCDataChannel',
        moz
          ? {}
          : {
            reliable: false,
          },
      );

      if (moz) channel.binaryType = 'blob';

      setChannelEvents();
    }

    function setChannelEvents() {
      channel.onmessage = function (event) {
        if (options.onChannelMessage) options.onChannelMessage(event);
      };

      channel.onopen = function () {
        if (options.onChannelOpened) options.onChannelOpened(channel);
      };
      channel.onclose = function (event) {
        if (options.onChannelClosed) options.onChannelClosed(event);

        console.warn('WebRTC DataChannel closed', event);
      };
      channel.onerror = function (event) {
        if (options.onChannelError) options.onChannelError(event);

        console.error('WebRTC DataChannel error', event);
      };
    }

    if (options.onAnswerSDP && moz && options.onChannelMessage) openAnswererChannel();

    function openAnswererChannel() {
      peer.ondatachannel = function (event) {
        channel = event.channel;
        channel.binaryType = 'blob';
        setChannelEvents();
      };

      if (!moz) return;
      navigator.mozGetUserMedia(
        {
          audio: true,
          fake: true,
        },
        (stream) => {
          peer.addStream(stream);
          createAnswer();
        },
        useless,
      );
    }

    // fake:true is also available on chrome under a flag!
    function useless() {
      log('Error in fake:true');
    }

    function onSdpSuccess() {}

    function onSdpError(e) {
      if (options.onChannelError) {
        options.onChannelError(e);
      }
      console.error('sdp error:', e);
    }

    return {
      addAnswerSDP(sdp, cbSuccess, cbError) {
        peer.setRemoteDescription(
          new SessionDescription(sdp),
          cbSuccess || onSdpSuccess,
          cbError || onSdpError,
        );
      },
      addICE(candidate) {
        peer.addIceCandidate(
          new IceCandidate({
            sdpMLineIndex: candidate.sdpMLineIndex,
            candidate: candidate.candidate,
          }),
        );
      },

      peer,
      channel,
      sendData(message) {
        if (channel) {
          channel.send(message);
        }
      },

      stop() {
        peer.close();
        if (options.attachStream) {
          if (typeof options.attachStream.stop === 'function') {
            options.attachStream.stop();
          } else {
            options.attachStream.active = false;
          }
        }
      },
    };
  }

  // getUserMedia
  const video_constraints = {
    mandatory: {},
    optional: [],
  };

  function getUserMedia(options) {
    let n = navigator,
      media;
    n.getMedia = n.webkitGetUserMedia || n.mozGetUserMedia;
    n.getMedia(
      options.constraints || {
        audio: true,
        video: video_constraints,
      },
      streaming,
      options.onerror || function(e) { console.error(e); },
    );

    function streaming(stream) {
      // var video = options.video;
      // var localVideo = options.localVideo;
      // if (video) {
      //  video[moz ? 'mozSrcObject' : 'src'] = moz ? stream : window.webkitURL.createObjectURL(stream);
      // video.play();
      // }

      if (options.localVideo) {
        options.localVideo[moz ? 'mozSrcObject' : 'src'] = moz
          ? stream
          : window.webkitURL.createObjectURL(stream);
        options.localVideo.style.display = 'block';
      }

      if (options.onsuccess) {
        options.onsuccess(stream);
      }

      media = stream;
    }

    return media;
  }

  $.FSRTC.resSupported = function (w, h) {
    for (const i in $.FSRTC.validRes) {
      if ($.FSRTC.validRes[i][0] == w && $.FSRTC.validRes[i][1] == h) {
        return true;
      }
    }

    return false;
  };

  $.FSRTC.bestResSupported = function () {
    let w = 0,
      h = 0;

    for (const i in $.FSRTC.validRes) {
      if ($.FSRTC.validRes[i][0] > w && $.FSRTC.validRes[i][1] > h) {
        w = $.FSRTC.validRes[i][0];
        h = $.FSRTC.validRes[i][1];
      }
    }

    return [w, h];
  };

  const resList = [[320, 180], [320, 240], [640, 360], [640, 480], [1280, 720], [1920, 1080]];
  let resI = 0;
  let ttl = 0;

  var checkRes = function (cam, func) {
    if (resI >= resList.length) {
      const res = {
        validRes: $.FSRTC.validRes,
        bestResSupported: $.FSRTC.bestResSupported(),
      };

      localStorage.setItem(`res_${cam}`, $.toJSON(res));

      if (func) return func(res);
      return;
    }

    const video = {
      mandatory: {},
      optional: [],
    };

    if (cam) {
      video.optional = [{ sourceId: cam }];
    }

    w = resList[resI][0];
    h = resList[resI][1];
    resI++;

    video.mandatory = {
      minWidth: w,
      minHeight: h,
      maxWidth: w,
      maxHeight: h,
    };

    getUserMedia({
      constraints: {
        audio: ttl++ == 0,
        video,
      },
      onsuccess(e) {
        e.getTracks().forEach((track) => {
          track.stop();
        });
        console.info(`${w}x${h} supported.`);
        $.FSRTC.validRes.push([w, h]);
        checkRes(cam, func);
      },
      onerror(e) {
        console.error(`${w}x${h} not supported.`);
        checkRes(cam, func);
      },
    });
  };

  $.FSRTC.getValidRes = function (cam, func) {
    const used = [];
    const cached = localStorage.getItem(`res_${cam}`);

    if (cached) {
      const cache = $.parseJSON(cached);

      if (cache) {
        $.FSRTC.validRes = cache.validRes;
        console.log(`CACHED RES FOR CAM ${cam}`, cache);
      } else {
        console.error('INVALID CACHE');
      }
      return func ? func(cache) : null;
    }

    $.FSRTC.validRes = [];
    resI = 0;

    checkRes(cam, func);
  };

  $.FSRTC.checkPerms = function (runtime, check_audio, check_video) {
    getUserMedia({
      constraints: {
        audio: check_audio,
        video: check_video,
      },
      onsuccess(e) {
        e.getTracks().forEach((track) => {
          track.stop();
        });

        console.info('media perm init complete');
        if (runtime) {
          setTimeout(runtime, 100, true);
        }
      },
      onerror(e) {
        if (check_video && check_audio) {
          console.error('error, retesting with audio params only');
          return $.FSRTC.checkPerms(runtime, check_audio, false);
        }

        console.error('media perm init error');

        if (runtime) {
          runtime(false);
        }
      },
    });
  };
}(jQuery));
