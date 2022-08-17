// index.js
Page({
    data: {
        userInfo: {
            // 信息配置
            // 所在省份
            province: "上海",
            // 所在城市
            city: "上海",
            // 生日，如果月份或者日期小于10，直接用对应的数字即可，例如1997- 1 - 1
            birthday: "2000-4-13",
            // 在一起的日子，格式同上
            love_date: "2015-9-1",
        },
        showInfo: {
            date: "",
            city: "",
            love_date: "",
            birthday: "",
            foryoo: {
                author: "",
                content: "",
            },
        }
    },

    // 获取每日一句
    get_yiju: function () {
        const that = this;
        wx.request({
            url: 'https://saying.api.azwcl.com/saying/get', //词霸接口地址
            // data: {
            //   x: '',
            //   y: ''
            // },
            header: {
                'content-type': 'application/json', // 默认值
            },
            success(res) {
                // console.log(res.data)
                const { data, code } = res.data;
                if (code === 200) {
                    that.setData({
                        showInfo: {
                            foryoo: {
                                author: data.author,
                                content: data.content,
                            }
                        }
                    })
                }
            },
            fail(err) {
                console.log(err);
            }
        });
    },

    get_day: function () {
        let today = new Date();
        let love_start_time = new Date('2016-9-1 00:00:00');
        // let birthday_time = new Date('2022-9-9 00:00:00');
        let res = today - love_start_time;
        let love_date = parseInt(res / 1000 / 60 / 60 / 24);
        // let birthday =
        this.setData({
            showInfo: {
                love_date: love_date,
            }
        });
        console.log(this.data.showInfo.love_date)
    },

    set: function (obj) {
        let that = this;
        setInterval(() => {
            that.setData({
                showInfo: {
                    date: new Date().toLocaleTimeString(),
                    city: "上海",
                    love_date: obj.love_date,
                    birthday: obj.birthday,
                    foryoo: {
                        author: obj.foryoo.author,
                        content: obj.foryoo.content,
                    }
                }
            })
        }, 1000);
    },
    goWeather: function (e) {
        wx.navigateTo({
            url: "/pages/weather/weather"
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        let today = new Date();
        let love_start_time = new Date('2016-9-1 00:00:00');
        let love_res = today - love_start_time;
        let love_date = parseInt(love_res / 1000 / 60 / 60 / 24);

        let birthday_time = new Date('2023-4-13 00:00:00');
        let birthday_res = birthday_time - today;
        let birthday_date = parseInt(birthday_res / 1000 / 60 / 60 / 24);

        const that = this;
        wx.request({
            url: 'https://saying.api.azwcl.com/saying/get', //词霸接口地址
            header: {
                'content-type': 'application/json', // 默认值
            },
            success(res) {
                // console.log(res.data)
                const { data, code } = res.data;
                if (code === 200) {
                    // that.setData({
                    //     showInfo: {
                    //         city: "上海",
                    //         love_date,
                    //         birthday: birthday_date,
                    //         foryoo: {
                    //             author: data.author,
                    //             content: data.content,
                    //         }
                    //     }
                    // })
                    that.set({
                        city: "上海",
                        love_date,
                        birthday: birthday_date,
                        foryoo: {
                            author: data.author,
                            content: data.content,
                        }
                    })
                }
            },
            fail(err) {
                console.log(err);
            }
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow(options) {
        // console.log(options);
        // setInterval(this.get_day, 3000);

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
})
