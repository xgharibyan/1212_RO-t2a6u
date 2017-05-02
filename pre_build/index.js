"use strict";

System.register(["rodin/core"], function (_export, _context) {
  "use strict";

  var RODIN, hoverAnimation, hoverOutAnimation, i, box;


  function onReady(evt) {
    evt.target.position.set(Math.random() * 4 - 2, Math.random() * 4 - 0.4, Math.random() * 4 - 2);
    RODIN.Scene.add(evt.target);
  }
  function hover(evt) {
    if (evt.target.animation.isPlaying('hoverOutAnim')) {
      evt.target.animation.stop('hoverOutAnim', false);
    }
    evt.target.animation.start('hoverAnim');
  }
  function hoverOut(evt) {
    if (evt.target.animation.isPlaying('hoverAnim')) {
      evt.target.animation.stop('hoverAnim', false);
    }
    evt.target.animation.start('hoverOutAnim');
  }
  return {
    setters: [function (_rodinCore) {
      RODIN = _rodinCore;
    }],
    execute: function () {
      RODIN.start();

      RODIN.Scene.add(new RODIN.Sculpt(new THREE.AmbientLight()));

      hoverAnimation = new RODIN.AnimationClip("hoverAnim", { scale: { x: 1.2, y: 1.2, z: 1.2 } });

      hoverAnimation.duration(100);

      hoverOutAnimation = new RODIN.AnimationClip("hoverOutAnim", { scale: { x: 1, y: 1, z: 1 } });

      hoverOutAnimation.duration(100);

      for (i = 0; i < 40; i++) {
        box = new RODIN.Box(.2, .2, .2, new THREE.MeshNormalMaterial({ wireframe: true, color: 0x996633 }));

        box.animation.add(hoverAnimation, hoverOutAnimation);
        box.on(RODIN.CONST.READY, onReady);
        box.on(RODIN.CONST.GAMEPAD_HOVER, hover);
        box.on(RODIN.CONST.GAMEPAD_HOVER_OUT, hoverOut);
      }
    }
  };
});