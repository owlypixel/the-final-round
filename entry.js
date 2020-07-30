import "./style.scss";
import gsap from "gsap";

console.clear();

const {
  timeline,
  to,
  set,
  utils: { random },
} = gsap;

// gsap.registerPlugin(MorphSVGPlugin);

const body = document.querySelector("#body");
const body_wrapper = document.querySelector("#body_wrapper");
const front_hand = document.querySelector("#front_x5F_hand");
const rear_hand = document.querySelector("#rear_x5F_hand");
const hit1 = document.querySelector("#hit1");
const hit2 = document.querySelector("#hit2");
const whisker1 = document.querySelector("#whisker1");
const whisker2 = document.querySelector("#whisker2");
const lights = document.querySelectorAll(".light");
const shadow = document.querySelector("#shadow");
const megaphone_left = document.querySelector("#megaphone_wave_left");
const megaphone_right = document.querySelector("#megaphone_wave_right");
const mute_btn = document.querySelector("#mute_btn");
const on = mute_btn.querySelector("#on");
const off = mute_btn.querySelector("#off");

lights.forEach((light) => {
  to(light, 1, {
    scale: 0.5,
    transformOrigin: "50%",
    yoyo: true,
    repeat: -1,
    delay: random(1, 10),
  });
});

const SharedTLDefaults = {
  yoyo: true,
  repeat: -1,
};

timeline()
  .to(
    body_wrapper,
    0.5,
    {
      rotate: -10,
      yoyo: true,
      repeat: -1,
      transformOrigin: "50% 100%",
    },
    0
  )
  .to(
    body,
    0.05,
    {
      xPercent: 1,
      yoyo: true,
      repeat: -1,
      transformOrigin: "50% 100%",
    },
    0
  )
  .to(shadow, 0.5, {
    x: -10,
    yoyo: true,
    repeat: -1,
  });

const Front_Hand_TL = timeline(SharedTLDefaults);
Front_Hand_TL.to(hit1, 0.1, { opacity: 0 })
  .to(front_hand, 0.15, {
    yoyo: true,
    rotate: 45,
    transformOrigin: "100%",
    onRepeat: () => {
      to(hit1, 0.1, { opacity: 1 });
    },
  })
  .timeScale(2);

set(hit2, { opacity: 0 });
const Rear_Hand_TL = timeline(SharedTLDefaults);
Rear_Hand_TL.to(rear_hand, 0.15, {
  yoyo: true,
  rotate: -35,
  transformOrigin: "100% 90%",
})
  .to(hit2, 0.1, { opacity: 1 })
  .timeScale(2);

to(megaphone_left, 0.5, { opacity: 0, yoyo: true, repeat: -1 });
to(megaphone_right, 0.5, {
  opacity: 0,
  yoyo: true,
  repeat: -1,
  delay: random(1, 3),
});

const SOUND = new Audio("src/sounds/boxing_match_sound.mp3");
SOUND.muted = true;

mute_btn.addEventListener("click", () => {
  toggle_sound();
});

set(on, { opacity: 0 });
set(off, { opacity: 1 });

const toggle_sound = () => {
  SOUND.play();
  const silent = !SOUND.muted;
  to(off, 0.5, { opacity: +silent });
  to(on, 0.5, { opacity: +!silent });
  SOUND.muted = silent;
};

to("#whisker1", 1, {
  MorphSVGPlugin: "#whisker2",
});
