package actions

import (
    "net/http"
    
	"github.com/gobuffalo/buffalo"
)

// CvIndex default implementation.
func CvIndex(c buffalo.Context) error {
	return c.Render(http.StatusOK, r.HTML("cv/index.html"))
}

