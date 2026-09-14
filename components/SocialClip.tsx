import LoopVideo from "./LoopVideo";

/**
 * A Canva mockup the user made themselves: a fake social post (an open box,
 * their box logo as the profile photo, animated floating hearts) — concrete
 * proof the "automated content" pitch isn't hypothetical.
 */
export default function SocialClip() {
  return <LoopVideo src="/media/box-socials.mp4" className="social-clip" />;
}
