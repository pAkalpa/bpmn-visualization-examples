class ThemeUseCase extends HacktoberfestUseCase {

    _theme;

    // Default bpmn-visualization theme
    #originalDefaultFontColor;
    #originalDefaultFontFamily;
    #originalDefaultFontSize;
    #originalDefaultStrokeColor;
    #originalDefaultFillColor;
    #originalPoolLabelFillColor;
    #originalConfigureCommonDefaultStyle;

    constructor(inputProjectName, themeState, title) {
        super(inputProjectName, title);
        this._theme = themes.get(themeState.year).get(themeState.mode);
    }

    _initBpmnVisualization(options) {
        this._saveDefaultTheme();

        bpmnvisu.StyleDefault.DEFAULT_FILL_COLOR = this._theme.default.fill;
        bpmnvisu.StyleDefault.DEFAULT_STROKE_COLOR = this._theme.default.stroke;
        bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR = this._theme.default.font;
        bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY = this._theme.default.fontFamily ?? 'Inter, Helvetica, sans-serif';
        bpmnvisu.StyleDefault.DEFAULT_FONT_SIZE = this._theme.default.fontSize ?? bpmnvisu.StyleDefault.DEFAULT_FONT_SIZE;

        const bpmnVisualization = new ThemeBpmnVisualization(options, this._theme);
        this._restoreDefaultTheme();
        return bpmnVisualization;
    }

    /**
     * Generic implementation
     */
    _saveDefaultTheme() {
        this.#originalDefaultFontColor = bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR;
        this.#originalDefaultFontFamily = bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY;
        this.#originalDefaultFontSize = bpmnvisu.StyleDefault.DEFAULT_FONT_SIZE;
        this.#originalDefaultStrokeColor = bpmnvisu.StyleDefault.DEFAULT_STROKE_COLOR;
        this.#originalDefaultFillColor = bpmnvisu.StyleDefault.DEFAULT_FILL_COLOR;
        this.#originalPoolLabelFillColor = bpmnvisu.StyleDefault.POOL_LABEL_FILL_COLOR;
        this.#originalConfigureCommonDefaultStyle = bpmnvisu.StyleConfigurator.configureCommonDefaultStyle;
    }

    /**
     * Generic implementation
     */
    _restoreDefaultTheme() {
        bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR = this.#originalDefaultFontColor;
        bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY = this.#originalDefaultFontFamily;
        bpmnvisu.StyleDefault.DEFAULT_FONT_SIZE = this.#originalDefaultFontSize;
        bpmnvisu.StyleDefault.DEFAULT_STROKE_COLOR = this.#originalDefaultStrokeColor;
        bpmnvisu.StyleDefault.DEFAULT_FILL_COLOR = this.#originalDefaultFillColor;
        bpmnvisu.StyleDefault.POOL_LABEL_FILL_COLOR = this.#originalPoolLabelFillColor;
        bpmnvisu.StyleConfigurator.configureCommonDefaultStyle = this.#originalConfigureCommonDefaultStyle;
    }

    _preLoadDiagram() {
        bpmnvisu.IconPainterProvider.set(new ThemeIconPainter(this._theme));
    }
}
