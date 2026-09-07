export const MAX_ANGLE = (30 * Math.PI) / 180;
export type PendulumState = { angle: number; angularVelocity: number };
export type PendulumTuning = { gravity: number; spring: number; damping: number; friction: number };
export const DEFAULT_TUNING: PendulumTuning = { gravity: 18, spring: 1.8, damping: 0.82, friction: 0.08 };

export function stepPendulum(state: PendulumState, deltaSeconds: number, tuning = DEFAULT_TUNING): PendulumState {
  // sin(angle) gives a realistic restoring torque around the fixed pivot.
  const angularAcceleration = -tuning.gravity * Math.sin(state.angle) - tuning.spring * state.angle;
  // Damping and friction remove energy gradually instead of tweening to zero.
  // A moving pendant displaces more air and rope tension, so damping increases
  // gently with angle while preserving a little natural overshoot.
  const variableDamping = tuning.damping + Math.abs(state.angle) * 0.55;
  const variableFriction = tuning.friction + Math.abs(state.angularVelocity) * 0.012;
  const velocity = state.angularVelocity * Math.exp(-variableDamping * deltaSeconds);
  const angularVelocity = velocity * Math.max(0, 1 - variableFriction * deltaSeconds) + angularAcceleration * deltaSeconds;
  const angle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, state.angle + angularVelocity * deltaSeconds));
  return { angle, angularVelocity };
}

export function isSettled(state: PendulumState): boolean {
  return Math.abs(state.angle) < 0.002 && Math.abs(state.angularVelocity) < 0.002;
}
