export function playNewOrderChime() {
  if (typeof window === 'undefined') return

  try {
    const ctx = new AudioContext()
    const gain = ctx.createGain()
    gain.gain.value = 0.55
    gain.connect(ctx.destination)

    const playTone = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq
      osc.connect(gain)
      osc.start(start)
      osc.stop(start + duration)
    }

    playTone(880, ctx.currentTime, 0.18)
    playTone(1174.66, ctx.currentTime + 0.22, 0.22)
    playTone(880, ctx.currentTime + 0.52, 0.18)
    playTone(1174.66, ctx.currentTime + 0.74, 0.3)

    window.setTimeout(() => {
      void ctx.close()
    }, 1300)
  } catch {
    // Audio may be blocked until user gesture; ignore
  }
}

export function announceNewOrder() {
  if (typeof window === 'undefined') return

  playNewOrderChime()
  if (!('speechSynthesis' in window)) return

  const announcement = new SpeechSynthesisUtterance('The new order has arrived')
  announcement.lang = 'en-US'
  announcement.volume = 1
  announcement.rate = 0.9
  window.setTimeout(() => {
    window.speechSynthesis.speak(announcement)
  }, 1100)
}
