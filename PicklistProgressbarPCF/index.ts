import {IInputs, IOutputs} from "./generated/ManifestTypes";
import picklistProgressbar = require("./PicklistProgressbar");

export class PicklistProgressbarPCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;
	private _controlViewRendered: boolean;
    private notifyOutputChanged: () => void;
    private currentValue: number | null;
    private defaultValue: number | undefined;
    private optionsMetaData: ComponentFramework.PropertyHelper.OptionMetadata[] | undefined;

    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
     public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
     {
         this._context = context;
         this._controlViewRendered = false;
         this._container = document.createElement("div");
         container.appendChild(this._container);
         this.notifyOutputChanged = notifyOutputChanged;
         //this.defaultValue = context.parameters.picklist_input_property.attributes?.DefaultValue;
         this.optionsMetaData = context.parameters.picklist_input_property.attributes!.Options;
         this.currentValue = context.parameters.picklist_input_property.raw;
     }
     
    private onChange = (newValue: number | null) => {
        this.currentValue = newValue;
        this.notifyOutputChanged();
    };

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
     public updateView(context: ComponentFramework.Context<IInputs>): void
     {
         this._context = context;
         if (!this._controlViewRendered) {
             this._controlViewRendered = true;
             picklistProgressbar.Render(this._context, this._container, this.onChange);
         }
     }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
		return {
			picklist_input_property: this.currentValue == null ? undefined : this.currentValue
		};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
