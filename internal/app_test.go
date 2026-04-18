package internal_test

import (
	"testing"

	"github.com/gen2brain/beeep"
)

func TestNotify(t *testing.T) {
	err := beeep.Notify("Focus Dock Notify", "Terminou o ciclo!", "C:\\dev\\_mix\\pomo\\imgs\\appicon.png")
	if err != nil {
		t.Error(err)
	}
}
