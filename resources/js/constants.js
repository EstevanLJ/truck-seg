import moment from "moment";

export const PERSON = 0;
export const COMPANY = 1;

export const LOCALE = {
    add: 'Add',
    address: 'Address',
    activity: 'Activity',
    activity_type: 'Activity Type',
    actions: 'Actions',
    branch: 'Branch',
    cancel: 'Cancel',
    city: 'City',
    corporate: 'Corporate',
    complement: 'Complement',
    description: 'Description',
    date: 'Date',
    deal: 'Deal',
    deals: 'deals',
    deal_updated: 'Deal updated',
    district: 'District',
    done: 'Done',
    edit: 'Edit',
    loading: 'Loading...',
    lost: 'Lost',
    main_address: 'Main Address',
    no: 'No',
    no_deals: 'No deals',
    number: 'Number',
    open: 'Open',
    one_deal: '1 deal',
    status_changed: 'Status Changed!',
    save: 'Save',
    state: 'State',
    yes: 'Yes',
    zip_code: 'Zip Code',
    won: 'Won',
    contact_name: 'Contact Name',
    full_name: 'Full Name',
    company_name: 'Company Name',
    brand_name: 'Brand Name',
    birthdate: 'Birthdate',
    founding_date: 'Founding Date',
    change_date: 'Change Date',
    activity_code: 'Activity Code',
    main_activity: 'Main Activity',
    juridic_nature: 'Juridic Nature',
    social_capital: 'Social Capital',
    ta_registry: 'TA Registry',
    type: 'Type',
    history: 'History',
    activities: 'Activities',
    files: 'Files',
    quotations: 'Quotations',
    remove: 'Remove',
    finish: 'Finish',
    reopen: 'Reopen',
    go_to_deal: 'Go to Deal',
    title: 'Title',
    location: 'Location',
    start_time: 'Start Time',
    end_time: 'End Time',
    finished_at: 'Finished at',
    no_activities: 'No Activities',
    finished_activities: 'Finished Activities',
    next_activities: 'Next Activities',
    observation: 'Observation',
    name: 'Name',
    size: 'Size',
    document: 'Document',
    drag_or_select: 'Drag your file here, or click to select',
    user: 'User',
    success: 'Success',
    confirm_delete: "Are you sure you want to delete the record?",
    warning: 'Warning',
    delete: 'Delete',
    client: 'Client',
    confirm_status_change: 'Are you sure you want to change the status?',
    confirm: 'Confirm',
    new_insurance: 'New Insurance',
    closing_probability: 'Closing Probability',
    insurance_company: 'Insurance Company',
    deadline: 'Deadline',
    board: 'Board',
    list: 'List',
    owner: 'Owner',
    status: 'Status',
    search: 'Search',
    failed_to_send_files: 'Failed to send files',
    files_sent: 'Files sent',
    sending_files: 'Sending files',
    attachments: 'Attachments',
    info: 'Info',
    back: 'Back',
    next: 'Next',
    could_not_change_status: 'Could not change the status',
}

export const insuranceTypes = [
    {
        value: "0",
        label: "Transportador",
    },
    {
        value: "1",
        label: "Embarcador",
    },
];

export const personTypes = [
    {
        value: 1,
        label: "Company",
    },
    {
        value: 0,
        label: "Person",
    },
];

export const dealFinishedStatus = [
    {
        value: 0,
        label: LOCALE.open,
    },
    {
        value: 1,
        label: LOCALE.won,
    },
    {
        value: 2,
        label: LOCALE.lost,
    },
];

export const yesOrNoOptions = [
    {
        value: "1",
        label: LOCALE.yes,
    },
    {
        value: "0",
        label: LOCALE.no,
    },
];

export const companyCorporate = [
    {
        value: "1",
        label: LOCALE.corporate,
    },
    {
        value: "0",
        label: LOCALE.branch,
    },
];

export const personContactTypes = [
    {
        value: "0",
        label: "Telefone",
    },
    {
        value: "1",
        label: "E-mail",
    },
    {
        value: "2",
        label: "Facebook",
    },
    {
        value: "3",
        label: "Instagram",
    },
    {
        value: "4",
        label: "Twitter",
    },
    {
        value: "5",
        label: "Skype",
    },
];

export const quotationStatusesList = [
    {
        value: "-1",
        label: "Todas",
    },
    {
        value: "0",
        label: "Aguardando",
    },
    {
        value: "1",
        label: "Atendimento",
    },
    {
        value: "2",
        label: "Finalizada",
    },
    {
        value: "3",
        label: "Cancelada",
    },
];

export const quotationStatuses = [
    {
        value: "0",
        label: "Aguardando",
    },
    {
        value: "1",
        label: "Atendimento",
    },
    {
        value: "2",
        label: "Finalizada",
    },
    {
        value: "3",
        label: "Cancelada",
    },
];

export const defaultUser = {
    id: "",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    roles: [],
};

export const defaultPipeline = {
    name: "",
    description: "",
};

export const defaultPipelineStatus = {
    pipeline_id: "",
    name: "",
    order: "",
    days_to_notify: "",
    can_win: "",
};

export const defaultPerson = {
    id: "",
    updated_at: "",
    type: "1",
    document: "",
    name: "",
    trading_name: "",
    contact_name: "",
    corporate: "",
    juridic_nature: "",
    antt_register: "",
    share_capital: 0,
    phone: "",
    email: "",
    creation_date: new Date(),
    main_activity_code: "",
    main_activity: "",
    addresses: [],
    contacts: [],
    employees: [],
    documents: [],
    activities: [],
};

export const defaultPersonAddress = {
    person_id: "",
    main: "",
    description: "",
    address: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    zip_code: "",
};

export const defaultPersonContact = {
    person_id: "",
    type: "",
    value: "",
};

export const defaultDeal = {
    id: "",
    pipeline_status_id: "",
    client_id: "",
    name: "",
    insurance_type: "0",
    new_insurance: "1",
    old_insurance_company_id: null,
    value: "",
    probability: 50,
    owner_id: "",
    observation: "",
    limit_date: new Date(),
    finished_status: "",
    finished_date: new Date(),
    finished_value: "",
    insurance_company_id: "",
    deal_lost_reason_id: "",
    finished_observation: "",
    files: [],
    histories: [],
    activities: [],
    client: { ...defaultPerson },
    pipeline: { ...defaultPipeline },
    pipeline_status: { ...defaultPipelineStatus },
    owner: { ...defaultUser },
};

export const defaultActivity = {
    activity_type_id: "",
    title: "",
    description: "",
    location: "",
    date: moment(),
    time_from: null,
    time_to: null,
    done_at: "",
    assigned_to: "",
    done_by: "",
};

export const defaultActivityType = {
    id: "",
    name: "",
    icon: "",
    active: true,
};
export const defaultQuotationType = {
    id: "",
    name: "",
    icon: "",
    active: true,
};

export const defaultRole = {
    id: "",
    display_name: "",
    name: "",
    description: "",
    permissions: [],
};

export const defaultPermission = {
    id: "",
    display_name: "",
    name: "",
    description: "",
};

export const defaultInsuranceCompany = {
    id: "",
    name: "",
    abbreviation: "",
    quotation_time: "",
};

export const defaultDealLoseReason = {
    id: "",
    name: "",
    description: "",
};

export const defaultCompanyEmployee = {
    id: "",
    person_id: "",
    name: "",
    role: "",
    email: "",
    phone: "",
    secondary_phone: "",
    has_whatsapp: "",
};

export const defaultCompanyActivity = {
    id: "",
    person_id: "",
    code: "",
    description: "",
};

export const defaultQuotation = {
    id: "",
    client_id: "",
    quotation_type_id: "",
    due_to: new Date(),
    status: "",
    assigned_to: "",
    created_by: "",
    name: "",
    observation: "",
};


export const DATAGRID_LOCALE = {
    // Root
    noRowsLabel: "No Data",
    noResultsOverlayLabel: "No results found.",
    errorOverlayDefaultLabel: "Error.",

    // Density selector toolbar button text
    toolbarDensity: "Density",
    toolbarDensityLabel: "Density",
    toolbarDensityCompact: "Compact",
    toolbarDensityStandard: "Standard",
    toolbarDensityComfortable: "Comfortable",

    // Columns selector toolbar button text
    toolbarColumns: "Columns",
    toolbarColumnsLabel: "Select Columns",

    // Filters toolbar button text
    toolbarFilters: "Filters",
    toolbarFiltersLabel: "Filters",
    toolbarFiltersTooltipHide: "Hide Filters",
    toolbarFiltersTooltipShow: "Show Filters",
    toolbarFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} active filters` : `${count} active filter`,

    // Export selector toolbar button text
    toolbarExport: "Export",
    toolbarExportLabel: "Export",
    toolbarExportCSV: "Download CSV",

    // Columns panel text
    columnsPanelTextFieldLabel: "Procurar coluna",
    columnsPanelTextFieldPlaceholder: "Título da coluna",
    columnsPanelDragIconLabel: "Reordenar coluna",
    columnsPanelShowAllButton: "Exibir todas",
    columnsPanelHideAllButton: "Esconder todas",

    // Filter panel text
    filterPanelAddFilter: "Adicionar filtro",
    filterPanelDeleteIconLabel: "Remove",
    filterPanelOperators: "Operadores",
    filterPanelOperatorAnd: "E",
    filterPanelOperatorOr: "Ou",
    filterPanelColumns: "Colunas",
    filterPanelInputLabel: "Valor",
    filterPanelInputPlaceholder: "Valor do filtro",

    // Filter operators text
    filterOperatorContains: "contém",
    filterOperatorEquals: "igual",
    filterOperatorStartsWith: "comça com",
    filterOperatorEndsWith: "termina com",
    filterOperatorIs: "é",
    filterOperatorNot: "não é",
    filterOperatorAfter: "maior que",
    filterOperatorOnOrAfter: "igual ou maior que",
    filterOperatorBefore: "menor que",
    filterOperatorOnOrBefore: "igual ou menor que",
    filterOperatorIsEmpty: "é vazio",
    filterOperatorIsNotEmpty: "não é vazio",

    // Filter values text
    filterValueAny: "qualquer",
    filterValueTrue: "verdadeiro",
    filterValueFalse: "falso",

    // Column menu text
    columnMenuLabel: "Menu",
    columnMenuShowColumns: "Exibir colunas",
    columnMenuFilter: "Filtro",
    columnMenuHideColumn: "Esconder",
    columnMenuUnsort: "Desordenar",
    columnMenuSortAsc: "Ordernar ascendente",
    columnMenuSortDesc: "Ordernar descendente",

    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,
    columnHeaderFiltersLabel: "Eixibir filtros",
    columnHeaderSortIconLabel: "Ordenar",

    // Rows selected footer text
    footerRowSelected: (count) =>
        count !== 1
            ? `${count.toLocaleString()} linhas selecionadas`
            : `${count.toLocaleString()} linha selecionada`,

    // Total rows footer text
    footerTotalRows: "Total de linhas:",

    // Total visible rows footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
        `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

    // Checkbox selection text
    checkboxSelectionHeaderName: "Seleção",

    // Boolean cell text
    booleanCellTrueLabel: "verdadeiro",
    booleanCellFalseLabel: "falso",

    // Used core components translation keys
    MuiTablePagination: {
        labelRowsPerPage: "Items per page",
        labelDisplayedRows: ({ from, to, count }) =>
            `${from}-${to} to ${count !== -1 ? count : `more than ${to}`}`,
    },
};


export const DATAGRID_LOCALE_PT_BR = {
    // Root
    noRowsLabel: "Sem dados",
    noResultsOverlayLabel: "Nenhum resultado encontrado.",
    errorOverlayDefaultLabel: "Ocorreu um erro.",

    // Density selector toolbar button text
    toolbarDensity: "Densidade",
    toolbarDensityLabel: "DensidadeDensity",
    toolbarDensityCompact: "Compacta",
    toolbarDensityStandard: "Padrão",
    toolbarDensityComfortable: "Comfortável",

    // Columns selector toolbar button text
    toolbarColumns: "Colunas",
    toolbarColumnsLabel: "Selecione Colunas",

    // Filters toolbar button text
    toolbarFilters: "Filtros",
    toolbarFiltersLabel: "Exibir filtros",
    toolbarFiltersTooltipHide: "Esconder filtros",
    toolbarFiltersTooltipShow: "Exibir filtros",
    toolbarFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,

    // Export selector toolbar button text
    toolbarExport: "Exportar",
    toolbarExportLabel: "Exportar",
    toolbarExportCSV: "Download CSV",

    // Columns panel text
    columnsPanelTextFieldLabel: "Procurar coluna",
    columnsPanelTextFieldPlaceholder: "Título da coluna",
    columnsPanelDragIconLabel: "Reordenar coluna",
    columnsPanelShowAllButton: "Exibir todas",
    columnsPanelHideAllButton: "Esconder todas",

    // Filter panel text
    filterPanelAddFilter: "Adicionar filtro",
    filterPanelDeleteIconLabel: "Remove",
    filterPanelOperators: "Operadores",
    filterPanelOperatorAnd: "E",
    filterPanelOperatorOr: "Ou",
    filterPanelColumns: "Colunas",
    filterPanelInputLabel: "Valor",
    filterPanelInputPlaceholder: "Valor do filtro",

    // Filter operators text
    filterOperatorContains: "contém",
    filterOperatorEquals: "igual",
    filterOperatorStartsWith: "comça com",
    filterOperatorEndsWith: "termina com",
    filterOperatorIs: "é",
    filterOperatorNot: "não é",
    filterOperatorAfter: "maior que",
    filterOperatorOnOrAfter: "igual ou maior que",
    filterOperatorBefore: "menor que",
    filterOperatorOnOrBefore: "igual ou menor que",
    filterOperatorIsEmpty: "é vazio",
    filterOperatorIsNotEmpty: "não é vazio",

    // Filter values text
    filterValueAny: "qualquer",
    filterValueTrue: "verdadeiro",
    filterValueFalse: "falso",

    // Column menu text
    columnMenuLabel: "Menu",
    columnMenuShowColumns: "Exibir colunas",
    columnMenuFilter: "Filtro",
    columnMenuHideColumn: "Esconder",
    columnMenuUnsort: "Desordenar",
    columnMenuSortAsc: "Ordernar ascendente",
    columnMenuSortDesc: "Ordernar descendente",

    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,
    columnHeaderFiltersLabel: "Eixibir filtros",
    columnHeaderSortIconLabel: "Ordenar",

    // Rows selected footer text
    footerRowSelected: (count) =>
        count !== 1
            ? `${count.toLocaleString()} linhas selecionadas`
            : `${count.toLocaleString()} linha selecionada`,

    // Total rows footer text
    footerTotalRows: "Total de linhas:",

    // Total visible rows footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
        `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

    // Checkbox selection text
    checkboxSelectionHeaderName: "Seleção",

    // Boolean cell text
    booleanCellTrueLabel: "verdadeiro",
    booleanCellFalseLabel: "falso",

    // Used core components translation keys
    MuiTablePagination: {
        labelRowsPerPage: "Itens por página",
        labelDisplayedRows: ({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `mais do que ${to}`}`,
    },
};
