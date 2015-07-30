angular.module('megaVideoDemo', [])
	.directive('megaVideo', function ($sce) {
		return {
			restrict: 'E',
			templateUrl: 'video.html',
			scope: true,
			link: function (scope, element, attrs) {
				var videoPlayer = element.find('video')[0];
				scope.sources = [];

				function processSources () {
					var sourceTypes = {
						webm: { type: 'video/webm' },
						mp4: { type: 'video/mp4' },
						ogg: { type: 'video/ogg' }
					};

					for (source in sourceTypes) {
						if (attrs.hasOwnProperty(source)) {
							scope.sources.push({
								type: sourceTypes[source].type,
								src: $sce.trustAsResourceUrl(attrs[source])
							});
						}
					}
				}
				processSources();
				scope.video = {
					play: function () {
						videoPlayer.play();
						scope.video.status = 'play';
					},
					pause: function () {
						videoPlayer.pause();
						scope.video.status = 'pause';
					},
					stop: function () {
						videoPlayer.pause();
						videoPlayer.currentTime = 0;
						scope.video.status = 'stop';
					},
					togglePlay: function () {
						scope.video.status == 'play' ? this.pause() : this.play();
					},
					width: attrs.width,
					height: attrs.height
				};
			}
		}
	});
