package actions

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gobuffalo/buffalo"
)

type SOProfile struct {
	Backoff int  `json:"backoff"`
	HasMore bool `json:"has_more"`
	Items   []struct {
		AccountID   int `json:"account_id"`
		BadgeCounts struct {
			Bronze int `json:"bronze"`
			Gold   int `json:"gold"`
			Silver int `json:"silver"`
		} `json:"badge_counts"`
		CreationDate            int    `json:"creation_date"`
		DisplayName             string `json:"display_name"`
		IsEmployee              bool   `json:"is_employee"`
		LastAccessDate          int    `json:"last_access_date"`
		LastModifiedDate        int    `json:"last_modified_date"`
		Link                    string `json:"link"`
		Location                string `json:"location"`
		ProfileImage            string `json:"profile_image"`
		Reputation              int    `json:"reputation"`
		ReputationChangeDay     int    `json:"reputation_change_day"`
		ReputationChangeMonth   int    `json:"reputation_change_month"`
		ReputationChangeQuarter int    `json:"reputation_change_quarter"`
		ReputationChangeWeek    int    `json:"reputation_change_week"`
		ReputationChangeYear    int    `json:"reputation_change_year"`
		UserID                  int    `json:"user_id"`
		UserType                string `json:"user_type"`
		WebsiteURL              string `json:"website_url"`
	} `json:"items"`
	QuotaMax       int `json:"quota_max"`
	QuotaRemaining int `json:"quota_remaining"`
}

// CvIndex default implementation.
func CvIndex(c buffalo.Context) error {

	resp, err := http.Get("https://api.stackexchange.com/2.3/users/1576965?order=desc&sort=reputation&site=stackoverflow")

	if err != nil {
		fmt.Println(err.Error())
	}

	defer resp.Body.Close()

	soprofile := SOProfile{}

	err = json.NewDecoder(resp.Body).Decode(&soprofile)
	if err != nil {
		return err
	}

	fmt.Println(soprofile.Items[0].Reputation)
	c.Set("reputation", soprofile.Items[0].Reputation)
	return c.Render(http.StatusOK, r.HTML("cv/index.html"))
}
