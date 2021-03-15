package actions

import (
	"fmt"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gobuffalo/buffalo"
)

func SiteHandler(c buffalo.Context) error {
	site, _ := strconv.Atoi(c.Param("site"))
	if site > 7 || site < 1 {
		return c.Render(http.StatusOK, r.HTML("sites/error.html"))
	} else {
		url := "sites/" + c.Param("site") + ".html"
		return c.Render(http.StatusOK, r.HTML(url))
	}
}

func RandomSiteHandler(c buffalo.Context) error {
	min := 1
	max := 7
	site := rand.Intn(max-min) + min
	url := fmt.Sprintf("sites/%d.html", site)
	return c.Render(http.StatusOK, r.HTML(url))
}
