var filterData = ['AveragePageViews','APVForecast','LYAPV' ];
Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-2010.png',
    phoneIcon: 'icon-2012.png',
    glossOnIcon: false,
        onReady: function() {
        window.generateData = function(n, floor) {
           
			  var data = [
			    {
                    name: "Feb",
                    AveragePageViews: 671776746,
                    APVForecast: 651182193,
                    LYAPV: 658108649    
                },
                {
                    name: "March",
					AveragePageViews: 658273554,
                    APVForecast: 663174453,
                    LYAPV: 638042816    
                },
                {
                    name: "April",
					AveragePageViews: 756105035,
                    APVForecast: 799181308,
                    LYAPV: 769308319    
                },
                {
                    name: "May",
					AveragePageViews: 651290143,
                    APVForecast: 662198334,
                    LYAPV: 680261569    
                },
                {
                    name: "Jun",
					AveragePageViews: 639801436,
                    APVForecast: 660181249,
                    LYAPV: 665371954   
                },
                {
                    name: "July",
					AveragePageViews: 727985834,
                    APVForecast: 738141779,
                    LYAPV: 760196106    
                },
                {
                    name: "Aug",
					AveragePageViews: 605767634,
                    APVForecast: 609194696,
                    LYAPV: 638118483    
                },
                {
                    name: "Sept",
					AveragePageViews: 673282212,
                    APVForecast: 672161614,
                    LYAPV: 683153484    
                },
                {
                    name: "Oct",
					AveragePageViews: 579300195,
                    APVForecast: 568195793,
                    LYAPV: 584306982   
                },
                {
                    name: "Nov",
					AveragePageViews: 672296771,
                    APVForecast: 647134057,
                    LYAPV: 653591134    
                },
                {
                    name: "Dec",
					AveragePageViews: 705655139,
                    APVForecast: 746172896,
                    LYAPV:716424413    
                },
				{
                    name: "Jan",
                    AveragePageViews: 577810403,
                    APVForecast: 597115345,
                    LYAPV: 594150015    
                }
				];
                
            return data;
        };
        window.store1 = new Ext.data.JsonStore({
            fields: ['name','AveragePageViews','APVForecast','LYAPV' ],
            data: generateData(6, 0)
        });
        window.store2 = new Ext.data.JsonStore({
            fields: ['name','AveragePageViews','APVForecast','LYAPV' ],
            data: generateData(6, 20)
        });
        window.store3 = new Ext.data.JsonStore({
            fields: ['name','AveragePageViews','APVForecast','LYAPV' ],
            data: generateData(12, 20)
        });
        //two function for lines
         

        var onRefreshTap1 = function() {
            window.store1.loadData();
        };
        var onRefreshTap2 = function() {
            window.store2.loadData();
        };
        var onRefreshTap3 = function() {
            window.store3.loadData();
        };

        var barChart = new Ext.chart.Panel({
            title: 'Bar Chart',
            layout: 'fit',
            iconCls: 'bar',
            dockedItems: {
                iconCls: 'shuffle',
                iconMask: true,
                ui: 'plain',
                handler: onRefreshTap1
            },
            items: [{
                xtype: 'chart',
                cls: 'barcombo1',
                theme: 'Demo',
                store: store1,
                animate: true,
                shadow: false,
                legend: {
                    position: {
                        portrait: 'right',
                        landscape: 'top'
                    }
                },
                interactions: [
                'reset',
                'togglestacked',
                {
                    type: 'panzoom',
                    axes: {
                        left: {}
                    }
                },
                {
                    type: 'iteminfo',
                    gesture: 'taphold',
                    panel: {
                        dockedItems: [{
                            dock: 'top',
                            xtype: 'toolbar',
                            title: 'Details'
                        }],

                        html: 'Testing'
                    },
                    listeners: {
                        'show': function(me, item, panel) {
                            var storeItem = item.storeItem;
                            panel.update('<ul><li><b>Month:</b> ' + storeItem.get('name') + '</li><li><b>Value: </b> ' + storeItem.get('AveragePageViews') + '</li></ul>');
                        }
                    }
                },
                {
                    type: 'itemcompare',
                    offset: {
                        x: -10
                    },
                    listeners: {
                        'show': function(interaction) {
                            var val1 = interaction.item1.value,
                                val2 = interaction.item2.value;

                            barChart.descriptionPanel.setTitle(val1[0] + ' to ' + val2[0] + ' : ' + Math.round((val2[1] - val1[1]) / val1[1] * 100) + '%');
                            barChart.headerPanel.setActiveItem(1, {
                                type: 'slide',
                                direction: 'left'
                            });
                        },
                        'hide': function() {
                            barChart.headerPanel.setActiveItem(0, {
                                type: 'slide',
                                direction: 'right'
                            });
                        }
                    }
                }],
                axes: [{
                    type: 'Numeric',
                    position: 'bottom',
                    fields: filterData,//['2012', '2011', '2010'],
                    label: {
                        renderer: function(v) {
                            return v.toFixed(0);
                        }
                    },
                    title: 'Page Views',
                    minimum: 0
                },
                {
                    type: 'Category',
                    position: 'left',
                    fields: ['name'],
                    title: 'Month'
                }],
                series: [{
                    type: 'bar',
                    xField: 'name',
                    yField: filterData,//['2012', '2011', '2010'],
                    axis: 'bottom',
                    highlight: true,
                    showInLegend: true
                }]
            }]
        });
        
        var columnChart = new Ext.chart.Panel({
            title: 'Column Chart',
            layout: 'fit',
            iconCls: 'column',
            dockedItems: {
                iconCls: 'shuffle',
                iconMask: true,
                ui: 'plain',
                handler: onRefreshTap1
            },
            items: [{
                xtype: 'chart',
                //cls: 'barcombo1',
                theme: 'Demo',
                store: store1,
                animate: true,
                shadow: false,
                legend: {
                    position: {
                        portrait: 'right',
                        landscape: 'top'
                    }
                },
                interactions: [
                'reset',
                'togglestacked',
                {
                    type: 'panzoom',
                    axes: {
                        left: {}
                    }
                },
                {
                    type: 'iteminfo',
                    gesture: 'taphold',
                    panel: {
                        dockedItems: [{
                            dock: 'top',
                            xtype: 'toolbar',
                            title: 'Details'
                        }],

                        html: 'Testing'
                    },
                    listeners: {
                        'show': function(me, item, panel) {
                            var storeItem = item.storeItem;
                            panel.update('<ul><li><b>Month:</b> ' + storeItem.get('name') + '</li><li><b>Value: </b> ' + storeItem.get('AveragePageViews') + '</li></ul>');
                        }
                    }
                },
                {
                    type: 'itemcompare',
                    offset: {
                        x: -10
                    },
                    listeners: {
                        'show': function(interaction) {
                            var val1 = interaction.item1.value,
                                val2 = interaction.item2.value;

                            columnChart.descriptionPanel.setTitle(val1[0] + ' to ' + val2[0] + ' : ' + Math.round((val2[1] - val1[1]) / val1[1] * 100) + '%');
                            columnChart.headerPanel.setActiveItem(1, {
                                type: 'slide',
                                direction: 'left'
                            });
                        },
                        'hide': function() {
                            columnChart.headerPanel.setActiveItem(0, {
                                type: 'slide',
                                direction: 'right'
                            });
                        }
                    }
                }],
                axes: [{
                    type: 'Numeric',
                    position: 'left',
                    fields: filterData,//['2012', '2011', '2010'],
                    label: {
                        renderer: function(v) {
                            return v.toFixed(0);
                        }
                    },
                    title: 'Page Views',
                    minimum: 0
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: 'Month'
                }],
                series: [{
                    type: 'column',
                    xField: 'name',
                    yField: filterData,//['2012', '2011', '2010'],
                    axis: 'left',
                    highlight: true,
                    showInLegend: true
                }]
            }]
        });


        var pieChart = new Ext.Panel({
            title: 'Pie Chart',
            layout: 'fit',
            iconCls: 'pie',
            dockedItems: {
                dock: 'top',
                xtype: 'toolbar',
                title: 'Average Page Views Summary',
                items: [{
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    iconCls: 'shuffle',
                    iconMask: true,
                    ui: 'plain',
                    handler: onRefreshTap2
                }]
            },
            items: [
                new Ext.chart.Chart({
                    cls: 'piecombo1',
                    theme: 'Demo',
                    store: store2,
                    animate: true,
                    legend: {
                        position: {
                            portrait: 'bottom',
                            landscape: 'left'
                        }
                    },
                    interactions: ['rotate', 'reset'],
                    series: [{
                        type: 'pie',
                        field: filterData[1],//'2011',
                        donut: 25,
                        showInLegend: true,
                        highlightDuration: 500,
                        highlight: {
                          segment: {
                            margin: 20
                          }
                        },
                        label: {
                            field: 'name'
                        }
                    }]
                })
            ]
        });

        var radarChart = new Ext.Panel({
            title: 'Radar Chart',
            layout: 'fit',
            iconCls: 'radar',
            dockedItems: {
                dock: 'top',
                xtype: 'toolbar',
                title: 'Average Page Views Summary',
                items: [{
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    iconCls: 'shuffle',
                    iconMask: true,
                    ui: 'plain',
                    handler: onRefreshTap3
                }]
            },
            items: [
                new Ext.chart.Chart({
                    cls: 'radarcombo1',
                    theme: 'Demo',
                    insetPadding: Ext.is.Phone ? 20 : 40,
                    animate: false,
                    store: store3,
                    legend: {
	                position: {
	                    portrait: 'bottom',
	                    landscape: 'right'
	                },
	                labelFont: '17px Helvetica, Arial, sans-serif' // To be moved to SCSS
	            },                    
                    interactions: ['rotate', 'reset'],
                    axes: [{
                        type: 'Radial',
                        steps: 5,
                        position: 'radial',
                        label: {
                            display: true
                        }
                    }],
                    series: [{
                    	showInLegend: true,
                        type: 'radar',
                        xField: 'name',
                        yField: filterData[0]//'2012'
                    },	
                    {
                    	showInLegend: true,
                        type: 'radar',
                        xField: 'name',
                        yField: filterData[1]//'2011'
                    },
                    {
                    	showInLegend: true,
                        type: 'radar',
                        xField: 'name',
                        yField: filterData[2]//'2010'
                    }]
                })
            ]
        });
        
        var lineChartDockedItems = {
                dock: 'top',
                xtype: 'toolbar',
                title: 'Average Page Views Summary',
                items: [{
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    iconCls: 'shuffle',
                    iconMask: true,
                    ui: 'plain',
                    handler: onRefreshTap3
                }]
            };
            
             var lineChartDockedItemsMobile = {
                
            };
            
            
        var lineChart = new Ext.Panel({
            title: 'Line chart',
            layout: 'fit',
            iconCls: 'line',
            dockedItems: Ext.is.Phone ? lineChartDockedItemsMobile : lineChartDockedItems,
            items: [
                new Ext.chart.Chart({
                    //cls: 'linecombo1',
                    theme: 'Demo',
                    insetPadding: Ext.is.Phone ? 20 : 40,
                    animate: false,
                    store: store3,
                    legend: {
                    position: 'right'
                },
                    
                    interactions: ['rotate', 'reset'],
                    axes: [{
                        type: 'line',
                        steps: 5,
                        position: 'line',
                        label: {
                            display: true
                        }
                    }],
                    axes: [{
                    type: 'Numeric',
                    minimum: 0,
                    position: 'left',
                    fields: filterData,
                    title: 'Page Views',
                    minorTickSteps: 1
                }, {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: 'Month of the Year'
                }],
                     series: [{
                    type: 'line',
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    fill: true,
                    smooth: false,
                    axis: 'left',
                    xField: 'name',
                    yField: filterData[0],//'2012',
                    title: filterData[0]//'2012'
                }, {
                    type: 'line',
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    axis: 'left',
                     fill: true,
                    smooth: false,
                    xField: 'name',
                    yField: filterData[1],//'2011',
                    title: filterData[1]//'2011'
                }, {
                    type: 'line',
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    fill: true,
                    smooth: false,
                    axis: 'left',
                    smooth: true,
                    xField: 'name',
                    yField: filterData[2],//'2010',
                    title: filterData[2]//'2010'
                }]
     })
            ]
        });



 var onHelpTap = function() {
            new Ext.Panel({
                floating: true,
                modal: true,
                centered: true,
                width: 300,
                height: 250,
                styleHtmlContent: true,
                scroll: 'vertical',
                dockedItems: [{
                    dock: 'top',
                    xtype: 'toolbar',
                    title: 'Line Chart'
                }],
                stopMaskTapEvent: false,
                fullscreen: false,
                html: "Tapping a data point will bring up detailed information about it"
            }).show('pop');
        };
        
 
        var tabpanel = new Ext.TabPanel({
            tabBar: {
                dock: 'bottom',
                layout: {
                    pack: 'center'
                }
            },
            fullscreen: true,
            cardSwitchAnimation: {
                type: 'slide'
            },
            items: [lineChart,barChart,columnChart,radarChart,pieChart]
        });
    }
});
