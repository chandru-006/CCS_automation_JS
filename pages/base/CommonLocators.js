const CommonLocators = {
  header: {
    logo: '.logo img',
    takeMeHome: 'a[href="/companies/care-request-activity"]',
    support: 'li:has(a:has-text("Support"))',
    logout: 'a[href="/users/logout"]',
  },

  modals: {
    CCS_Modal: '#CCS_Modal',
    modalTitle: '#CCS_ModalLabel',
    modalBody: '#CCS_Modal .modal-body',
    closeButton: '#CCS_Modal .btn-close',
    bootbox: '.bootbox.modal',
  },

  buttons: {
    primary: '.cr-green-btn',
    submit: 'button[type="submit"]',
    cancel: '.cr-cancel-btn',
    close: '.btn-close',
  },

  inputs: {
    startDate: '#start_date',
    endDate: '#end_date',
    textInput: 'input[type="text"]',
    checkbox: 'input[type="checkbox"]',
  },

  tables: {
    jtable: '#care-request-activity .jtable',
    noDataRow: '.jtable-no-data-row',
    rowCountDropdown: 'select[name="Row"]',
  },
};

export default CommonLocators;
