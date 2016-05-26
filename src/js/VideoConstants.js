class VideoConstants {
  // empty class on purpose
}

VideoConstants.VIDEO_QUALITY_SOURCE = [
  {
    id: 'qvga',
    label: 'QVGA 320x240',
    width: 320,
    height: 240
  }, {
    id: 'vga',
    label: 'VGA 640x480',
    width: 640,
    height: 480
  }, {
    id: 'qvga_wide',
    label: 'QVGA WIDE 320x180',
    width: 320,
    height: 180
  }, {
    id: 'vga_wide',
    label: 'VGA WIDE 640x360',
    width: 640,
    height: 360
  }, {
    id: 'hd',
    label: 'HD 1280x720',
    width: 1280,
    height: 720
  }, {
    id: 'hhd',
    label: 'HHD 1920x1080',
    width: 1920,
    height: 1080
  }
];

VideoConstants.VIDEO_RESOLUTION = {
  qvga: {
    width: 320,
    height: 240
  },
  vga: {
    width: 640,
    height: 480
  },
  qvga_wide: {
    width: 320,
    height: 180
  },
  vga_wide: {
    width: 640,
    height: 360
  },
  hd: {
    width: 1280,
    height: 720
  },
  hhd: {
    width: 1920,
    height: 1080
  },
};

VideoConstants.BAND_WIDTH = [
  {
    id: '250',
    label: '250kb'
  }, {
    id: '500',
    label: '500kb'
  }, {
    id: '1024',
    label: '1mb'
  }, {
    id: '1536',
    label: '1.5mb'
  }, {
    id: '2048',
    label: '2mb'
  }, {
    id: '3196',
    label: '3mb'
  }, {
    id: '4192',
    label: '4mb'
  }, {
    id: '5120',
    label: '5mb'
  }, {
    id: '0',
    label: 'No Limit'
  }, {
    id: 'default',
    label: 'Server Default'
  }
];

VideoConstants.FRAME_RATE = [
  {
    id: '15',
    label: '15 FPS'
  }, {
    id: '20',
    label: '20 FPS'
  }, {
    id: '30',
    label: '30 FPS'
  }
];


export default VideoConstants;
