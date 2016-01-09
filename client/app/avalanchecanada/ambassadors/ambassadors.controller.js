'use strict';

angular.module('avalancheCanadaApp')
  .controller('AmbassadorsCtrl', function ($scope, $stateParams, $anchorScroll) {
    $scope.ambassadors = [
      { name: 'Nadine Overwater',
        anchor: 'Nadine-Overwater',
        bio: 'Nadine started out on a snowmobile at age seven and has never looked back. She got into serious mountain sledding in 2007 and has been guiding in the Revelstoke area since 2010. She spends well over 100 days a season on her machine, riding with all different skill levels and pursuing professional-level avalanche training. In 2012, Nadine started La Nina Sled Camp, a venue for women riders to build confidence in a positive environment, away from the stress of having to keep up with their partners. Nadine hopes to continue influencing and educating other women to “get out and shred” as&nbsp;often&nbsp;as&nbsp;they&nbsp;like.',
        headshot: 'https://res.cloudinary.com/avalanche-ca/image/upload/v1448308062/Avalanche%20Ambassadors/Nadine_Head_Shot_Av_Am.jpg',
        actionshot: {
          img: 'https://res.cloudinary.com/avalanche-ca/image/upload/c_thumb,g_center,h_300,w_1026/v1448913791/Avalanche%20Ambassadors/IMG_9701TimGrey.jpg',
          credit: 'Tim Grey'
        },
        facebook: 'https://www.facebook.com/nadine.overwater',
        instagram: 'https://www.instagram.com/nadineoverwater/',
        website: 'http://www.laninasledcamp.ca/' },

      { name: 'Robin van Gyn',
        anchor: 'Robin-van-Gyn',
        bio: 'Robin is a professional snowboarder living in Whistler. Although she grew up skiing, she switched to a snowboard when she was 15. She started competing in international events while studying at the University of Calgary and although she had some good success in competition, Robin felt the draw of the backcountry. In 2003 she began coaching and guiding for SASS Global Travel in Argentina and hasn’t missed a summer since. Robin also has a very busy film career, working with a number of production companies and appearing in virtually every industry publication. Over the past 10 years she has worked to improve her understanding of the mountains through avalanche education and has developed a passion for encouraging other like-minded individuals to do the same.',
        headshot: 'https://res.cloudinary.com/avalanche-ca/image/upload/c_scale,w_300/v1448309894/Avalanche%20Ambassadors/Robin_VanGyn_Headshot_Av_Am.jpg',
        actionshot: {
          img: 'https://res.cloudinary.com/avalanche-ca/image/upload/v1449873395/Avalanche%20Ambassadors/robin-hanyes-banner-full.jpg',
          credit: 'Oli Gagnon / Roxy'
        },
        facebook: 'https://www.facebook.com/robinvangyn',
        twitter: 'https://twitter.com/robinvangyn',
        instagram: 'https://www.instagram.com/robinvangyn/',
        website: 'http://robinvangyn.com/' }
    ];

   if($stateParams.anchor) {
     console.log()
     $anchorScroll($stateParams.anchor);
   }
 })
;
