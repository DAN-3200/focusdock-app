package main

import (
	"embed"
	"pomo/internal"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := internal.NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "FocusDock",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.Startup,
		Bind: []interface{}{
			app,
		},
		Frameless:     true,
		DisableResize: true,
		MaxWidth:      440,
		MaxHeight:     400,
		MinWidth:      440,
		MinHeight:     400,
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
