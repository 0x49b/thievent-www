package grifts

import (
	"github.com/gobuffalo/buffalo"
	"github.com/lichtwellenreiter/thievent_www/actions"
)

func init() {
	buffalo.Grifts(actions.App())
}
