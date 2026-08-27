import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rawData = `
title,url,duration,views
Kali Kali Zulfon Ke Phande Na,https://youtube.com/watch?v=lsqsggtTZfs,867,95000000
Saja Hai Maikhana,https://youtube.com/watch?v=8dlkBDK0_Aw,494,64000000
Wich Pardesan I Dr Zeus Ft. Shortie,https://youtube.com/watch?v=8h5bgmdGE2U,284,25000000
Menu Yadan Terian Aondiyan Ne,https://youtube.com/watch?v=OqENfj3TZL0,448,19000000
Khula Hai Maikhana (Remix),https://youtube.com/watch?v=npmJUYt6Z8U,485,18000000
Jani Door Gaye,https://youtube.com/watch?v=r8mIeP3aRQs,1116,16000000
Khali Morda Nahin Data Hajveri,https://youtube.com/watch?v=IosA1Rrgggw,905,15000000
Meri Zindagi Hai Tu (Remix),https://youtube.com/watch?v=Crwo6Tuhtw0,477,15000000
Charkhay De Har Har Gehray,https://youtube.com/watch?v=o-tcsnwW6J8,522,12000000
Tere Bina Rogi Hoye Pyase Nain ｜ Noor Jehan,https://youtube.com/watch?v=mBcGSdafEHc,489,12000000
Kise Da Yaar Na Vichre,https://youtube.com/watch?v=ocMEmQ3s8qE,433,12000000
Mein Yaar Yaar (Akhiyan Lar Gaiyan) & Dr Zeus Ft. Shortie,https://youtube.com/watch?v=KX_3IiRLAhU,189,9600000
Sun Charkhe Di Mithi Mithi Ghook,https://youtube.com/watch?v=ogTjOq0GKiM,437,9000000
Sukh Mahi Naal Le Gaya,https://youtube.com/watch?v=zJv5_1BH18M,406,8600000
Khawaja Eh Khajagaan Hamiye Bekasaan,https://youtube.com/watch?v=0FWk6AUDlyk,699,8100000
Piya Re Piya Re,https://youtube.com/watch?v=6BmS-qphjko,472,7400000
Lut Gaye - Original Ankh Uthi Mohabbat Ne,https://youtube.com/watch?v=w_5vIxqGo7g,1174,6400000
Na Rukte Hain Ansoo,https://youtube.com/watch?v=c5RbkAcgGAE,867,6400000
Akhiyan Lar Gaiyan (Yaar Yaar Kehna),https://youtube.com/watch?v=MZ_3IfsyJ4A,377,5800000
Dil Nu Soch Vichar Baray Ne,https://youtube.com/watch?v=jDPf_DZOXC0,525,5300000
All Time Best Qawwalies,https://youtube.com/watch?v=FIzjqBtb_xo,12109,5200000
Bina Mahi Kiven Dil Parchavan,https://youtube.com/watch?v=SNiivv-FbJA,864,5100000
Kithe Ishq Da Rog Na Laa Baithin,https://youtube.com/watch?v=SL8cCiTWwZA,808,5100000
Meri Zindagi Tera Pyar,https://youtube.com/watch?v=yW9mLaPt1_E,350,4800000
Main Diwani Gunj Shakar Di,https://youtube.com/watch?v=oGcVULcLbMU,919,4600000
Tere Bin Nahin Lagda,https://youtube.com/watch?v=f6uRxh2l0I4,444,4400000
Mere Baad Kisko Satao Ge,https://youtube.com/watch?v=XPYuEVzQFrw,2804,4100000
Sanu Bhul Gayi Khudayi Chanan Sari,https://youtube.com/watch?v=DXQzo_vl9J4,1021,3900000
Sitaro Tum To Sou Jao,https://youtube.com/watch?v=1ssmTxiJ08U,331,3900000
Main Chithi Pawan Sajna Noon,https://youtube.com/watch?v=dezR97fJ6fI,1742,3700000
Mae Ni Mae Mere Geetan De Nainan Wich ｜OSA Worldwide,https://youtube.com/watch?v=QPkx4lTjNwg,490,3700000
Ve Perdesia,https://youtube.com/watch?v=kCAd04Td-_8,376,3600000
Rabba Kadi Vi Na Paen Vichore,https://youtube.com/watch?v=PAqOeo8Mi5A,1219,3500000
Tere Darwaze Peh Chilman Nahin Dekhi Jati,https://youtube.com/watch?v=PoUJ_Zulcts,1150,3400000
Sare Nabian Da Nabi,https://youtube.com/watch?v=cKtyCamb9fE,993,3400000
Chan Sajnan Morr Moharan,https://youtube.com/watch?v=d6y8Ona0yTU,935,3400000
Ae Wadah Shikan,https://youtube.com/watch?v=aVEVQ_xVJyo,781,3400000
Aastan Hai Yeh Kis Shahe Zeshan Ka Marhaba Marhaba,https://youtube.com/watch?v=F1uGfBV7LhQ,1807,3200000
Noor E Khuda Hai,https://youtube.com/watch?v=-HFNS8OfuFw,967,3200000
Haqeeqat Ka Agar Afsana Ban Jaye,https://youtube.com/watch?v=mjH8v6UFt5w,749,3200000
Mahi Mein Tenu Yaad Karan,https://youtube.com/watch?v=R0CQykgJIPw,445,3200000
Lagian De Dukh Wakhre,https://youtube.com/watch?v=mis8DRqkKsg,445,3200000
Dam Dam Ali Ali Kar,https://youtube.com/watch?v=PfWXbhXMpq8,1310,3000000
Maikhaney Anpol Giya Wan,https://youtube.com/watch?v=_ERdeuG1Vtk,527,2800000
Phiroon Dhoondta Maikada Tauba Tauba,https://youtube.com/watch?v=ySCH6C_VYoc,1130,2700000
Hanju Akhiyan De Vehre Vich,https://youtube.com/watch?v=0An3w-0M5rk,1011,2700000
Ho Jaye Je Pyar Te Sona Bhul Janda,https://youtube.com/watch?v=KqFUj9rFZL0,416,2600000
Un Ka Andaz E Karam,https://youtube.com/watch?v=g4wk720e5YU,1064,2500000
Data Hajweri Tenu Lakhan,https://youtube.com/watch?v=K66IwoSuRpA,520,2400000
Jhoole Jhoole Lal (Star Crazy) Bally Sagoo,https://youtube.com/watch?v=MlyNlDfjucI,456,2400000
Sukh Dukh ｜ Dr Zeus,https://youtube.com/watch?v=dOU5W3z-RSw,321,2400000
Unse Hi Unki Mulaqat Ho Gayi,https://youtube.com/watch?v=fifh8AyqYFA,728,2300000
Kinna Sohna (Remix) ｜ Bally Sagoo & Kinna Sona,https://youtube.com/watch?v=ebJeEMwvMY0,482,2300000
Yara Tera Toon Sohna,https://youtube.com/watch?v=e1T3asACRC0,430,2300000
Jinhoon Karna Ae Yaad Dila,https://youtube.com/watch?v=GF53U7xY4Gs,936,2200000
Man Atkeya Beparwah De Naal,https://youtube.com/watch?v=Lmv_WI0aLQE,875,2200000
Main Talkhi-e-Hayat Se Ghabra Ke Pee Gaya ｜ Complete,https://youtube.com/watch?v=8EcuVEUAEBw,673,2200000
Meri Zindagi Hai Tu ｜ Gham Hai Ya Khushi Hai Tu,https://youtube.com/watch?v=9PME3GdmjUE,485,2200000
Ja Dil Tenoon De Chadya,https://youtube.com/watch?v=3PqBUMR7wnI,1570,2000000
Rog Soch Ke Muhabbatan De ,https://youtube.com/watch?v=oQUQN_o1DDo,924,1900000
Main Rowan Tainon Yaad Kar Ke,https://youtube.com/watch?v=VT1NrKPIDgQ,776,1900000
Dil Mar Jane Nu,https://youtube.com/watch?v=7WZGIXNXusU,478,1900000
Mujhe Tum Yaad Aate Ho,https://youtube.com/watch?v=VVDZrw4ayz4,324,1900000
Wadah Kar Ke Sajjan Nahee Aya,https://youtube.com/watch?v=LTrtgO-rmWo,885,1800000
Ya Hayyo Ya Qayyum ,https://youtube.com/watch?v=OEFkz8HHmj0,1061,1700000
Dukhan Diyan Gal Paiyan,https://youtube.com/watch?v=MAutmcyWVxY,708,1700000
Main Neewan Mera Murshad Ucha,https://youtube.com/watch?v=g8bwXVkjwxY,1821,1600000
Judaiyan De Dukhre,https://youtube.com/watch?v=OiACfbYjzz4,883,1600000
Sanware Tore Bin Jiya,https://youtube.com/watch?v=zbDLkWOprVE,423,1600000
Jis Dil Wich Sajnan Vas Jaiye,https://youtube.com/watch?v=5_paxrWUqHs,854,1500000
Jadon Yaad Sajjan Teri Ayee,https://youtube.com/watch?v=zbScacT9KW4,797,1500000
Sanu Ek Pal Chain,https://youtube.com/watch?v=oQ7UYptPRQs,574,1500000
Aj Yaadan Teriyan Aaiyan,https://youtube.com/watch?v=lzkLaQSLtlE,576,1300000
Ab Dekh Ke Jee Gabrata Hai,https://youtube.com/watch?v=ExS-X1qr6LE,390,1300000
Alif Allah Chambe Di Booti,https://youtube.com/watch?v=hpXTpJRSgDY,1826,1200000
Akhian Toon Hoveen Na Tu Door,https://youtube.com/watch?v=WKfWexfh438,436,1200000
Ae Khatme Rasul Qonain Mein Tum Sa Koi Nahin,https://youtube.com/watch?v=Ynx_PBOFLXU,1381,1100000
Kissey Nahin Teri Zaat Puchni,https://youtube.com/watch?v=xTigLUmUIGs,934,1100000
Meri Zindagi Hai Tu,https://youtube.com/watch?v=R44LmuCV4mo,484,1100000
Mera Gham Aur Meri Har Khushi,https://youtube.com/watch?v=sEMnvO8lFlU,416,1100000
Wohi Khuda Hai,https://youtube.com/watch?v=gDOlh5FYHhg,363,1000000
Meri Ankhon Ko Bakhshe Hain Ansoo,https://youtube.com/watch?v=KTBANeJD2E4,662,960000
Tasbeeh De Ik Ik Dane,https://youtube.com/watch?v=CCnOpyGQg00,1078,947000
Behad Ramzan Dasda Mera Dholan Mahi,https://youtube.com/watch?v=K6k8rK3PtJM,1856,944000
Mori Bhi Rung Do Chunri,https://youtube.com/watch?v=0-k_5QSiMZs,838,929000
Kehde Ghar Jawan,https://youtube.com/watch?v=42vjaGgnlJ8,853,893000
Loay Loay Aaja Mahi,https://youtube.com/watch?v=aK9ME1Puxfs,741,871000
Qismat Ko Manzoor Yehi Tha,https://youtube.com/watch?v=i09vBCavrQA,1073,855000
Doston Ki Shikayat,https://youtube.com/watch?v=dlepwV5-vrA,832,839000
Hum Buton Ko Jo Pyar Karte Hain,https://youtube.com/watch?v=oKS_brNHrCQ,908,837000
Dil Pe Zakham Khate Hain,https://youtube.com/watch?v=npICvoKoT0s,575,783000
Chithi Kehre Watnan Nu Pawan,https://youtube.com/watch?v=5pQU2TBbYPg,2219,781000
Piala,https://youtube.com/watch?v=a0NtT4vMTEE,1221,760000
Dub Dub Jawe Dil,https://youtube.com/watch?v=18wSs9zCzF4,551,757000
Mast Nazron Se (Remix),https://youtube.com/watch?v=3uclOtUakfk,454,727000
Maar Gai Udeek Din Raat Di,https://youtube.com/watch?v=FTwcyEO6bmc,271,721000
Data Tera Darbar Hai,https://youtube.com/watch?v=Ij9SMT53Fn4,956,719000
Ya Muhammad Madine Bula Lo,https://youtube.com/watch?v=bwTbhRHscGY,1816,713000
Piya Re Piya Re (Remix),https://youtube.com/watch?v=n38zFJt6tHc,277,711000
Kahan Aake Rukne Teh Raste,https://youtube.com/watch?v=cZbR381Zdd8,411,643000
Dost Kya Khoob Wafaon Ka Sila Dete Hain,https://youtube.com/watch?v=qo2-XStPPlU,498,624000
Bina Maahi ｜ Mahi Bollywood Film,https://youtube.com/watch?v=alXqAVy64o0,406,599000
Sun Le Duawan Meriyan,https://youtube.com/watch?v=vL3vCJU9GB8,1445,598000
Dum Dum Ali Ali (Remix) ｜ Bally Sagoo ,https://youtube.com/watch?v=MD_jhswM3Fc,381,593000
Rah Asan Ho Gayee Hogi,https://youtube.com/watch?v=OnP3-9_AjGQ,515,583000
Sheikh Jee Baith Kar Maekashon Mein,https://youtube.com/watch?v=p_efJxyBs0s,1557,573000
Gham Sabhi Rahat O Taskeen,https://youtube.com/watch?v=cWSElOXO5U0,895,548000
Khudi Ka Sirre Nihan,https://youtube.com/watch?v=hOHLQfQdmYU,1089,542000
Kabhi Ae Haqeeqat,https://youtube.com/watch?v=ZIRxg8_KkXA,517,530000
Ali Da Malang (Remix) ｜ Bally Sagoo,https://youtube.com/watch?v=2FVqLzBBEXY,449,528000
Woh Hata Rahe Hain Pardah,https://youtube.com/watch?v=8ioB-2Njr_w,482,525000
Main Khayal Hoon Kisi Aur Ka,https://youtube.com/watch?v=yHvSqYulHns,500,505000
Yeh Jo Halka Halka Saroor Hai,https://youtube.com/watch?v=TF_cOANSeJ8,442,500000
Gin Gin Tare Langdian Ratan,https://youtube.com/watch?v=QRcsWdm0ml0,399,480000
Shala Sukhan Diyan Neendran,https://youtube.com/watch?v=FYvQRAvl6wg,951,466000
More Khawaja,https://youtube.com/watch?v=D8l0JyPM5NU,903,466000
Akhian Noon Chain Na Awe,https://youtube.com/watch?v=Pk_Wlnmtx8E,404,466000
Woh Hata Rahe Hain Pardah,https://youtube.com/watch?v=EpycXKKEbPE,812,455000
Heeray Ni Ranjah Jogi Ho Gaya,https://youtube.com/watch?v=EIvwnclI6I4,713,453000
Changi Lagdi Na Dhola,https://youtube.com/watch?v=l-pFKtMyjCc,415,443000
Pyar Akhiyan De Buhe,https://youtube.com/watch?v=9icIt_YbATY,1724,434000
Meri Ankhon Ko Ankhon Ka Kinara,https://youtube.com/watch?v=oDfrSKfvSsY,326,432000
Na Jaween Dholna,https://youtube.com/watch?v=mQQ-JBH6E9Y,462,430000
Jind Meri Mahi Mahi,https://youtube.com/watch?v=FGi2O2jiCyU,562,422000
Mera Piya Ghar Aaya,https://youtube.com/watch?v=dF2WMqbpJ8k,535,421000
Jab Bhi Ji Chahta Hai Peene Ko,https://youtube.com/watch?v=slRI8BS7M_k,1344,407000
Tu Agar Benaqab Ho Jaye,https://youtube.com/watch?v=q50UEFQm3Rc,506,404000
Baba Farid Sohna,https://youtube.com/watch?v=DEj07YxmAsk,1132,398000
Kab Yaad Mein Tera Saath Nahin,https://youtube.com/watch?v=5x5eHgffhTI,556,397000
Mera Piya Ghar Ayaa (Remix),https://youtube.com/watch?v=_0BOvKz7I-4,384,391000
Lagi Waley Te Akh Neyon Launde,https://youtube.com/watch?v=J5ymQXFQHAg,1151,377000
Sanon Tay Changa Toon,https://youtube.com/watch?v=vJdDKuQ2w0k,348,376000
Wigar Gayi Ae Thore Dinan Toon,https://youtube.com/watch?v=FJf417JnfOk,618,375000
Galey Lipte Hain Woh Bijli Ke Dar Se,https://youtube.com/watch?v=lIvRxsPgYZs,448,370000
Mast Nazron Se Allah Bachaye,https://youtube.com/watch?v=cf1ZEKo4IEg,938,350000
Dhol Mahia,https://youtube.com/watch?v=qa-9wEkAhsw,456,344000
Arshe Azam Ka Doolha,https://youtube.com/watch?v=XlK02UiZxTQ,1359,342000
Yaad-E-Nabi Ka Gulshan Mehka,https://youtube.com/watch?v=sCQ-HoE4hnI,1766,340000
Teri Deed Da Menon Cha Sajna,https://youtube.com/watch?v=UOli41m691Q,2346,335000
Botal Khuli Hae Raqs Mein Jam E Sharab Hai,https://youtube.com/watch?v=ZKKSu-F4ulE,1801,328000
Main Kahin Bhi Jaon Eh Jaan,https://youtube.com/watch?v=ZXaYdQLLU0c,598,326000
Kinna Sona,https://youtube.com/watch?v=5Hk9kYGcCHY,264,317000
Ruttan Pyar Karn Diyan Aayan,https://youtube.com/watch?v=rEjlrVQmqb4,968,303000
Bujhi Hui Shama Ka Dhuan Hoon,https://youtube.com/watch?v=Kxa448qyIBI,1196,301000
Nit Khair Mangan,https://youtube.com/watch?v=YpFd9vcxyrc,919,300000
Allah Hoo (Remix),https://youtube.com/watch?v=stsNz9xDq4U,367,296000
Yeh Teri Umar Jise Sab Shabab Kehte Hain,https://youtube.com/watch?v=3MAZNwaP-_I,808,294000
Meri Tauba,https://youtube.com/watch?v=xJEkdSVVmsY,566,289000
Jis Ki Janib Woh Nazar Apni Utha,https://youtube.com/watch?v=4LCDN6nXH4Q,904,285000
Shikwa (Allama Iqbal),https://youtube.com/watch?v=-DrQ6ZKjkgQ,997,277000
Jaag Uthen Dard Purane,https://youtube.com/watch?v=a-h0yZ_FcyM,596,275000
Karan Tasbeeh Mein Data Tere Naam Di,https://youtube.com/watch?v=VdQP-TeYcjE,938,272000
Mahiya,https://youtube.com/watch?v=G_bgWiMR1L0,1002,270000
Roze Mehshar Se Na Ghabrao,https://youtube.com/watch?v=dtrUbMwHiFs,1833,269000
Saadgi To Hamari,https://youtube.com/watch?v=TFWn6-uyamw,907,269000
Samander Mein Samander,https://youtube.com/watch?v=7vvyolIxATE,327,268000
Mere Dukhan Noon O Yara,https://youtube.com/watch?v=zE6rJscD5Ew,531,265000
Luk Luk Rona Pae Gaya,https://youtube.com/watch?v=RqHz2-6MJH8,947,261000
Mujhko Teri Kasam Tujhsa Koi Nahin,https://youtube.com/watch?v=4Co5ElozdSM,805,261000
Eh Sochan Soch Ke Dil Mera,https://youtube.com/watch?v=UXr8IZK85SE,805,254000
Yeh Sham Phir Nahin Aye Gi,https://youtube.com/watch?v=TXKbKIwmApw,398,242000
Sajna Tere Bina,https://youtube.com/watch?v=hTN2MFybo1o,582,239000
Maikadah Bhi Apna Hai,https://youtube.com/watch?v=YOs37_kpPqE,564,236000
Meri Zeest Pur Mussarrat I,https://youtube.com/watch?v=R_THtlowPn4,782,234000
Rabba Lakh Lakh Shukar Manawan,https://youtube.com/watch?v=EoLLGeGsBuI,860,233000
Raat Ko Chandni Jab Khile,https://youtube.com/watch?v=ViOldC8LTPU,392,233000
Kivain Mukhre Toon Nazran Hatawan,https://youtube.com/watch?v=LGM5LCafV6s,1320,230000
Aap Baithe Hain Balin Peh Meri,https://youtube.com/watch?v=JZ1P11HmqcY,949,225000
Tum Ne Bhi Thukra Hi Diya Hai,https://youtube.com/watch?v=Aj_mfNKZQhk,549,223000
Buha Aes Wele Kine Kharkaya,https://youtube.com/watch?v=JiUs2u_LLgw,657,218000
Dil Sulagane Laga Chandni Raat Mein,https://youtube.com/watch?v=XkFZfmrOs0s,435,218000
Mahia Pardesi Ho Gaya,https://youtube.com/watch?v=tJHFLywlEtY,1023,217000
Koi Bole Ram Ram,https://youtube.com/watch?v=sqUaAYOax_Q,837,215000
Kithe Mehr Ali Aj Sik Mitran Di,https://youtube.com/watch?v=xedRBX18sI4,1842,214000
Mera Dhol Mahi Mere Man Ka Raja,https://youtube.com/watch?v=OMqyRAFnQuw,1830,206000
Aa Bhi Ja Rut Badalne Lagi,https://youtube.com/watch?v=Qy7sfnwA6gs,648,203000
Unke Dar Peh Poohnchne To Payen,https://youtube.com/watch?v=9eR4toOd1II,2282,201000
Sab Vird Karo Allah Allah,https://youtube.com/watch?v=77IToSVmeH4,795,200000
Sikh Chaj Koi Yaar Manowan Da (Bulleh Shah),https://youtube.com/watch?v=nkzZH6EleNc,1221,199000
Sham Savere,https://youtube.com/watch?v=8qQYLLSyVo4,493,198000
Prohniya Noon Jana Penda Ae,https://youtube.com/watch?v=LgaUEHBsnu0,926,195000
Akhian Udeekdian,https://youtube.com/watch?v=WIZ89mx0xc0,712,195000
Yaad e Nabi Ka Gulshan Mehka,https://youtube.com/watch?v=H6ff2pnxUn0,463,192000
Ishq Diwana Mera Rog Purana,https://youtube.com/watch?v=-ZXdr-QrDKE,382,190000
Jab Tera Hukom Mila,https://youtube.com/watch?v=HJkqyQyV1W4,298,190000
Mittar Pyare Noon (Gurbani Shabad),https://youtube.com/watch?v=YfZyLDfQvFM,8458,188000
Ae Kash Tujhe Aisa Ik Zakhm-E-Judaee Doon,https://youtube.com/watch?v=H7y3n4rH0_c,493,187000
Dam Dam Karo Fareed,https://youtube.com/watch?v=tp7Z1ABKqG4,879,184000
Jhoole Jhoole Lal,https://youtube.com/watch?v=-w67LcyrOO4,737,183000
Kuch Toh Hawa Bhi Sard Thi,https://youtube.com/watch?v=QjUKd_PXNPY,294,179000
Sahnoon Rog Laan Walia (Remix) ｜ Bally Sagoo &,https://youtube.com/watch?v=1GSE9SKsUSc,506,178000
Jhoole Laal Jhoole Laal,https://youtube.com/watch?v=CkH9aHf-mmg,486,178000
Das Ke Kasoor Na Gaya,https://youtube.com/watch?v=CKYv9wrejkU,385,175000
Thori Der Hor Thehr Ja,https://youtube.com/watch?v=w7aMfR5Psak,956,173000
Kabhi Dil Se Na Tera Dard,https://youtube.com/watch?v=JwDUzQjJuUQ,381,161000
Ali Maula Ali Maula Ali Dam Dam,https://youtube.com/watch?v=KRukZRbC0bQ,470,160000
Dam Mast Mast,https://youtube.com/watch?v=EJBFtCOuQOE,855,159000
Ehnan Akhian Ne Pesh Na Jaan,https://youtube.com/watch?v=VqHIgnY2WU0,458,156000
Nabi Syed Ul Anmbia,https://youtube.com/watch?v=oWjbgLtIpW0,878,155000
Tu Kuja Man Kuja (Remix),https://youtube.com/watch?v=iIiFsFpwxkY,750,149000
Sajna Tere Bina,https://youtube.com/watch?v=JQ6QWiKqt_8,421,149000
Ali Maula Ali Dam Dam (Remix),https://youtube.com/watch?v=MefCg-EIXp0,1805,147000
Vichora Sohne Yaar Wala,https://youtube.com/watch?v=h-ukDvaXfLQ,799,147000
Na Sawal Ban Ke Mila Karo,https://youtube.com/watch?v=ROubyBv6hHc,483,145000
Kamli Wale Nigah e Karam Ho Agar,https://youtube.com/watch?v=Lg07cYlqaWM,3117,144000
Kande Utte Mehrman Ve,https://youtube.com/watch?v=KI6_Ed359og,1230,144000
Mera Dil Vi Chaunda Madine Mein Jawan,https://youtube.com/watch?v=atjFvW4Qo2s,883,144000
Ho Jaye Je Pyar Te Sona Bhul Jaunda (Remix),https://youtube.com/watch?v=Z-QE6-m-XOg,409,144000
Aadmi Aadmi Se Milta Hai,https://youtube.com/watch?v=shMHvQckiAA,398,143000
Sindhri De Shahbaz Qalander,https://youtube.com/watch?v=DwWWhHWHuvk,851,137000
Tara Tara Jagun,https://youtube.com/watch?v=dk_VHsDWXFw,327,131000
Awwal Allah Noor Upaya,https://youtube.com/watch?v=b7CXD6ofxIw,838,129000
Yadan Vichre Sajjan (Remix),https://youtube.com/watch?v=bSrsvshGsaM,401,128000
Un Ki Gali Mein,https://youtube.com/watch?v=-apuwXi7wR8,374,128000
Yaadan Vichre Sajan Diyan Aaiyan,https://youtube.com/watch?v=ax-Q3lvg3SM,2782,127000
Dard Rukta Nahin Ik Pal Bhi Ishq Ki Yeh Saza Mil Rahi Hai,https://youtube.com/watch?v=zWig033LYDw,1739,127000
Ve Main Akhiyan Akhiyan ｜ Muqaddar Film,https://youtube.com/watch?v=P9bgkv6T1BQ,359,126000
Dilruba Sa Chehra Remix Dr. Zeus Ft. Kanika Kapoor & Shortie,https://youtube.com/watch?v=8RzE-L2ag68,189,123000
Mere Sabir Teri Chaukhat Ki,https://youtube.com/watch?v=J9m1Tqjpito,855,113000
Angrai Peh Angrai Lehti Hai,https://youtube.com/watch?v=SA5-LTUdu6s,934,112000
Noor Azli Chamkiya,https://youtube.com/watch?v=NfBnEjYl1DA,899,112000
Din Mein Kab Socha Karte,https://youtube.com/watch?v=xbWIrzVHD-c,467,112000
Aaja Mahi,https://youtube.com/watch?v=I4GK1GDhcEE,445,112000
Mast Nazron Se Allah Bachaye,https://youtube.com/watch?v=bJyZHCudVv8,388,112000
Sun Charkhe Di Mithi Mithi Ghook (Remix),https://youtube.com/watch?v=Wv-yCzptLz4,433,110000
Jis Simt Dekhon,https://youtube.com/watch?v=ccyv8kJgFUI,312,108000
Dam Dama Dam Ali Ali,https://youtube.com/watch?v=OweQeWpb3kc,954,107000
Aaj Rung Hai,https://youtube.com/watch?v=fyAiE2U4hqY,1092,105000
Band Hua Sara Maikhana,https://youtube.com/watch?v=iGhZbe1JuGs,521,104000
Talwar Hain Teri Ankhen,https://youtube.com/watch?v=O9CRfu823UM,450,102000
Ahista Ahista,https://youtube.com/watch?v=2qp3mxHD2Xw,303,101000
Yadon Ke Saye,https://youtube.com/watch?v=ZRSvwA0Il-k,337,100000
Janda Hoya Dil Le Gaya,https://youtube.com/watch?v=nEKaxZ5dbjY,663,99000
Sanson Ki Mala Peh at His Best,https://youtube.com/watch?v=ha8IT9xiKLo,383,98000
Mera Sohna Sajan,https://youtube.com/watch?v=IhMxg_sxCXU,238,98000
Mustafa Ya Mustafa ,https://youtube.com/watch?v=HC7h3hi0dLg,792,97000
Poochha Kisi Se Haal Kisi Ka,https://youtube.com/watch?v=STGPKHz7MHM,470,97000
Kar Le Dil Di Sifayi ,https://youtube.com/watch?v=0XCOJpZeoq8,1034,96000
Meri Bukkal De Vich Chor Chor,https://youtube.com/watch?v=UzxfYEPTen0,644,96000
Nahin Jeena Pyar Bina,https://youtube.com/watch?v=IIrPXWxgMQQ,418,96000
Lohay Lohay & Bubble (Bloodline) Ft. Shortie,https://youtube.com/watch?v=tUUbncuq3D4,223,96000
Ham Apni Sham Ko Jab Nazr E Jam Karte Hain,https://youtube.com/watch?v=ECpxxJpwd3s,573,95000
Menu Yaadan Teriyan ,https://youtube.com/watch?v=SJSEc9fGfSU,481,95000
Ghunghat Chuk Lai Sajna Ve Hun Sharman Kanu Rakhian Ve,https://youtube.com/watch?v=D9K0GeCP-do,616,93000
Sochta Hoon ｜ Dekhte Dekhte,https://youtube.com/watch?v=M9oZYHtZXtk,1379,92000
Sade Naal & GSL (Bloodline),https://youtube.com/watch?v=-FlpA3AKK2E,280,91000
Ya Haiyo Ya Qayyum (Remix),https://youtube.com/watch?v=kcwDeEITYmQ,1122,89000
Jab Raat Dhali Aadhi,https://youtube.com/watch?v=fJ50GeWBv6o,518,89000
Ali Maula - Bashment Mix & Simon & Diamond,https://youtube.com/watch?v=AqiE49RDep0,296,89000
Kali Kamli Mein Woh Zeeshan Nazar,https://youtube.com/watch?v=gue0nfjMjY4,1631,87000
Suboh Ko Daur Mein Lao,https://youtube.com/watch?v=eUxDwFHv6ik,402,87000
Chithi,https://youtube.com/watch?v=TJWDUXL82Kk,320,87000
O Disdi Kulli Sohne Yaar Di,https://youtube.com/watch?v=1Fu5oHTRqmM,1487,84000
Hijaab Ko Benaqaab Hona Tha,https://youtube.com/watch?v=wBaqnP_PlXk,434,83000
Man Kunto Maula,https://youtube.com/watch?v=KIxErk5SrCc,554,82000
Komplein Phir Phoot Ayeen,https://youtube.com/watch?v=uVE2G9onIH4,339,82000
Jadon Ek Wari Lag Jawe,https://youtube.com/watch?v=XWw62YFJ78A,446,81000
Diya Jale Sari Raat,https://youtube.com/watch?v=mC3IglW1YhY,243,81000
Jhoole Jhoole Lal (Tabla Mix) ｜ Bally Sagoo,https://youtube.com/watch?v=Gq0bwk0AZyI,475,79000
Chahat Ke Sukh,https://youtube.com/watch?v=QWS5agXu7V0,319,78000
Sohne Mukhre Da Lain De Nazara,https://youtube.com/watch?v=YgQ5Y04lRO8,766,77000
Sanson Ki Mala Pe Simron ,https://youtube.com/watch?v=Fcg0VcMMKBk,1137,75000
Haq Ali Ali Haq,https://youtube.com/watch?v=7Ot9mhtaGyY,449,75000
Jadon Da Tu Rus,https://youtube.com/watch?v=N6x9itKWflc,335,75000
Tere Lariyan Ne Umar Gawayi,https://youtube.com/watch?v=-vyeR1qT3dg,445,74000
Menon Yaar Manaonon Fusrat Nahin,https://youtube.com/watch?v=88TfxIO45nA,1051,73000
Soorat Teri,https://youtube.com/watch?v=ZFAM8WA7dpk,428,73000
Aondiyan Ne Jad Yadan,https://youtube.com/watch?v=NPDaBoiJm54,292,72000
Zee Halle Miskin,https://youtube.com/watch?v=aONAE7tEKgc,1240,70000
Mujhe Yaad Kijiye,https://youtube.com/watch?v=YgcukqHHf88,583,68000
Yaran De Naal Yaar,https://youtube.com/watch?v=ILJ1muDUCvU,354,67000
Tera Dilruba Sa Chehra,https://youtube.com/watch?v=fQj914v3PI0,370,65000
Ham Ne Dekha Tha Ek Khawab,https://youtube.com/watch?v=pyNY4mlCZQg,630,64000
Farsooda Jahan,https://youtube.com/watch?v=v461gkksiSA,904,63000
Sanson Ki Mala Peh Simroon,https://youtube.com/watch?v=ywU6mBKPkjc,390,62000
Jab Kisi Jaam Ko,https://youtube.com/watch?v=ovrmR3TVGh8,499,61000
Mere Hath Mein Tera Hath Hai,https://youtube.com/watch?v=nAjk1yU07m8,429,61000
Sanon Yaar Di Namaz,https://youtube.com/watch?v=jAwYkEHelwE,1190,59000
Marhaba Salle Ala,https://youtube.com/watch?v=c9IB06Wo5Ic,741,59000
Mere Dholan Mahi Aaja Akhian Taras Gaiyan,https://youtube.com/watch?v=jFMh7KYbOvc,536,59000
Ni Main Jana Jogi De Naal,https://youtube.com/watch?v=d9P0cz90X98,497,59000
Mast Qalander,https://youtube.com/watch?v=XWDNAI3MWAM,454,58000
Yaad e Nabi (Remix),https://youtube.com/watch?v=g1vLzKciAxA,284,58000
Mera Piya Ghar Aaya ,https://youtube.com/watch?v=gx8J9LBG0Z8,1093,57000
More Saiyaan To Hai Pardes,https://youtube.com/watch?v=vAoQhkRr0ME,489,57000
Bandit Queen (The Cry),https://youtube.com/watch?v=O_EPDC6DEAw,1795,56000
Dyare Ishq Mein Apna Maqam Paida Kar,https://youtube.com/watch?v=ExdWyUUqmuw,1060,56000
Menu Teri Deewani Ve Ranjhna,https://youtube.com/watch?v=-HZHa3ng514,496,56000
Raaten Shor Machati Hain,https://youtube.com/watch?v=aqfDPGmXgWE,455,56000
Mera Chan Veer Naeen Aya,https://youtube.com/watch?v=m1DCX09l_pE,1836,53000
Naseeb Mera Jaga Diya,https://youtube.com/watch?v=MTNqsrRkvt8,1078,53000
Gali Wichon Kaun Langia,https://youtube.com/watch?v=c365vCBTB3U,988,52000
Akhian Noon Chain Na Awe (Remix),https://youtube.com/watch?v=Pq9v5ENI4QM,402,52000
Kise Da Yaar Na Vichre (Live at Royal Albert Hall),https://youtube.com/watch?v=O0gAjeSvXTs,334,52000
Ranjhe Yaar Walon Mukh Kevain Moran,https://youtube.com/watch?v=k5ukQb_BTCg,1034,50000
Mitar Piyare Noon,https://youtube.com/watch?v=Njq6RGXwfqQ,899,50000
Ja Murr Ja Ishqe Vich Kee Rakhia,https://youtube.com/watch?v=U8BuI1jW0GQ,897,50000
Soona Soona Dil Lagta Hai,https://youtube.com/watch?v=rr3heK6u3y8,352,49000
Ranjah Te Mera Rab Varga,https://youtube.com/watch?v=dUCVq4lGBwA,1432,48000
Aisa Bana Sanwarna Mubarik Tumhen,https://youtube.com/watch?v=PMLHdFvMazA,1051,47000
Hisab Umar Ka Itna Sa Goshwara,https://youtube.com/watch?v=7kIhgUQnW2I,355,47000
Yeh Jo Halka Halka,https://youtube.com/watch?v=HeTWrsTyLOs,4078,46000
Is Karam Ka Karon Shukar Kaise Ada,https://youtube.com/watch?v=GG2FeE5WdWA,1207,46000
Jhoom Raha Hae Chishti Gulshan,https://youtube.com/watch?v=zi8llDTAD4o,1601,45000
Beh Ja Mahi,https://youtube.com/watch?v=g_wP7Q5jEAk,1246,45000
Tum To Na Aye,https://youtube.com/watch?v=118p_w-sCv8,449,45000
Yeh Aarzoo Thi Madine Ka,https://youtube.com/watch?v=_npDygzXczE,667,44000
Allah Hoo Allah Hoo,https://youtube.com/watch?v=o7fArxQHR-8,484,44000
Pyar Pyar - Electro Mix & Simon & Diamond,https://youtube.com/watch?v=2GyqSr2czBI,218,44000
Mae Ni Main Jhok Fareedan Jana,https://youtube.com/watch?v=nlftNrz9h0Q,1290,43000
Je Toon Akhiyan De Samne,https://youtube.com/watch?v=J7elfeOP8xA,596,43000
Kab Tak Too Oonchi Awaz Mein,https://youtube.com/watch?v=fvTbir9DhhU,281,43000
Jiya Lagena Moura & Rahat Fateh Ali Khan,https://youtube.com/watch?v=pVQ3pJyWrck,276,42000
Kehte Ho Ishq Ka Afsana Chahiye,https://youtube.com/watch?v=CvFeEkt-yPU,1511,41000
Aankhen Tumharian,https://youtube.com/watch?v=a73jlkJ-PL0,310,41000
Farida Turiya Turiya Ja,https://youtube.com/watch?v=W8mk5pzaFlU,813,40000
Tere Bin Nahin Lagda (Tere Bin) & Partners In Rhyme,https://youtube.com/watch?v=iW8dfldGiXI,351,40000
Shabaz Qalander - Radio Edit & Simon & Diamond,https://youtube.com/watch?v=lOQ5ML_FPzk,316,40000
Yaar Yaar Kehna,https://youtube.com/watch?v=7Wf_UhkhKOk,377,39000
Hai Kahan Ka Irada Sanam,https://youtube.com/watch?v=1-ASv3RhUQM,1418,37000
Haq Ali Ali (Live ar Royal Albert Hall),https://youtube.com/watch?v=pqy7zR4hQr4,1469,36000
Hussain Hai Hussain Hai,https://youtube.com/watch?v=zAHoqOFRUkA,502,36000
Aye Chand Has Do,https://youtube.com/watch?v=nlQPT7B3F9w,409,36000
Jawan Main Sadqe Muhammad,https://youtube.com/watch?v=ahI4JRWK_20,999,35000
Ae Jaan-E-Jan,https://youtube.com/watch?v=pewROOzgSQw,312,33000
Rah Asan Ho Gayee Hogi (Remix),https://youtube.com/watch?v=6yypy90zKlk,509,32000
Sajana ｜ Kanika Kapoor Ft. DJ Envy,https://youtube.com/watch?v=qdvC0ecdnbw,332,32000
Tere Bin (Remix) & Kais Khan Ft. Sir Aah,https://youtube.com/watch?v=ve6510lH-h0,299,32000
Tere Hondiyan Sondiyan Mehbooba,https://youtube.com/watch?v=oX9u0TfohRY,933,31000
Jadon Ali Ali Vird Pukaran,https://youtube.com/watch?v=5IXVGUEDcy4,671,31000
Jana Jogi De Naal (Remix),https://youtube.com/watch?v=ljOQX4exeEs,483,31000
Mera Eh Charkha Naulakha,https://youtube.com/watch?v=jFbIciVUkzc,2036,30000
Meri Shutar Sawara Gal Sun Ja,https://youtube.com/watch?v=3sT_ebbslOM,2158,29000
Assi Azlan Toon Tere Aan Diwane,https://youtube.com/watch?v=GkIPgilk0CY,980,29000
Jadon Amlan De Wal Takna,https://youtube.com/watch?v=oW-QI1h-U2Q,948,29000
Ham Ne Dekha Tha Ek Khawab,https://youtube.com/watch?v=R9ksyW_UcF0,630,29000
Aainon Mein Yeh Jitne Chehre,https://youtube.com/watch?v=AVuDlG_pEDA,406,29000
Wich Pardesan ｜ Dr Zeus,https://youtube.com/watch?v=Dl2Ecggay1g,278,29000
Kina Sohna Tenu ｜ Kinna Sona,https://youtube.com/watch?v=gTQIYkJz-RU,211,29000
Ali Ali Maula Ali Ali,https://youtube.com/watch?v=raziUxzHXOE,1739,28000
Ali Maula Ali Maula Ali Dam Dam,https://youtube.com/watch?v=3XwHFs2zlD4,1818,27000
Ho Nigahe Karam Ya Muhammad,https://youtube.com/watch?v=heJk4pqVK-U,1765,27000
Jawab Shikwa (Solo with Orchestra),https://youtube.com/watch?v=9NhpVV_p6Sw,1381,27000
Haq Ali Haq (Remix),https://youtube.com/watch?v=FeVXxoNFi8E,433,26000
Bari Bari Imam Bari,https://youtube.com/watch?v=ynlMW95kVnw,784,25000
Aaja Mahi - Garage Club Remix & Simon & Diamond,https://youtube.com/watch?v=CHaTwMXNwYs,300,25000
Ali Maula Ali Dum Dum,https://youtube.com/watch?v=CFE9u6Z19uU,1825,24000
Khoon Akhian Choon,https://youtube.com/watch?v=KiZO8J4I7oM,1035,24000
Jhalian Judaiyan Nahiyo Janiyan,https://youtube.com/watch?v=Iu6QQcxjuwU,702,24000
Din Chup Gaya,https://youtube.com/watch?v=6gWhJssfe9E,2005,23000
Dyare-e-Ishq Mein Apna Makam Paida Kar,https://youtube.com/watch?v=V0Hepl6Z9s4,584,23000
Nit Khair Mangan (Remix),https://youtube.com/watch?v=UL2dHNNN-M8,442,23000
USTAD,https://youtube.com/watch?v=4anfgBlFnJA,7038,22000
Raag Gawati (Classical),https://youtube.com/watch?v=trAnc7ROc30,1357,22000
Bari Bari Imam Bari,https://youtube.com/watch?v=UUiOOWw1i7w,784,22000
Har Dam Ali Maula Kahija,https://youtube.com/watch?v=d_fQezoW3uY,517,22000
Mae Ni Mae Mere Geetan De (Remix),https://youtube.com/watch?v=tvAoeIsDjUo,487,22000
Phir Sawan Rut Ki Pawan Chali,https://youtube.com/watch?v=XIZkl0jYxvY,312,22000
Jee Karda Ay Dardan Noon,https://youtube.com/watch?v=Ni_aUMagx7Y,824,21000
Yara Tere Toon Sohna (Slap Bass Rb Remix),https://youtube.com/watch?v=-3NC2v8gG-s,285,21000
Pyar Ke Phool Charhane Aye Hain,https://youtube.com/watch?v=qUfpkDo58dA,2085,20000
Shikwa (Solo with Orchestra),https://youtube.com/watch?v=_b3mhddRjA4,1659,20000
Kamli Wale Nabi Aa Gaye,https://youtube.com/watch?v=Ofmf-AF_6qY,1088,20000
Ali Maula Ali Maula ,https://youtube.com/watch?v=jnNsyBvwWpo,672,20000
Halka Halka Saroor,https://youtube.com/watch?v=IPW98Obk11Y,668,20000
Ali Da Malang (Live Version),https://youtube.com/watch?v=HvLnqpewnL8,456,20000
Ishq Nachiya & Bubble (Bloodline) Ft. Shortie,https://youtube.com/watch?v=U8W5f3I99sI,203,20000
Ya Muhammad Noor Ho Tum,https://youtube.com/watch?v=5lhNAgPs55U,1808,19000
Soona Soona Din Lagta,https://youtube.com/watch?v=9RH3JOcLPyg,353,19000
Rawain Sahnwan De Nere Nere,https://youtube.com/watch?v=J-R32xv3-XU,346,19000
O Jaan E Man Jaan E Bahar,https://youtube.com/watch?v=AMy9LqfoxOI,341,19000
Sadness - Best Sad Qawwalies,https://youtube.com/watch?v=Ob70FjeyzHQ,9374,18000
Koi Dekhda Naeen Khatawan Nu,https://youtube.com/watch?v=ajt2ChSAUn4,786,18000
Meri Zindagi Ek Khuwab,https://youtube.com/watch?v=SjAEb3DJO5o,482,18000
Jhoole Jhoole Lal (Junglist Version) Bally Sagoo,https://youtube.com/watch?v=2I7o3_4D2yw,378,18000
Gham Judaiyan De,https://youtube.com/watch?v=DQK5gnTTzGg,1636,17000
Jawab-E-Shikwa,https://youtube.com/watch?v=sMoZcXFUUm8,1470,17000
Ishqech Kee Rakhia,https://youtube.com/watch?v=x_3d8ojp_qk,1039,17000
Madine Hazri Howe,https://youtube.com/watch?v=IpYc_-eIUXY,1815,16000
Ban Kay Aya Hoon Sawali,https://youtube.com/watch?v=Fv332Vv-rnU,945,16000
Shahswar e Karbala Kee Shahswari Ko Salam,https://youtube.com/watch?v=ltU5A_A2Lzk,892,16000
Ya Rasool Allah,https://youtube.com/watch?v=G2SRczESGtA,836,16000
Mangte Hain Karam,https://youtube.com/watch?v=yQtDE7liPbk,1809,15000
Daata Ke Deewane,https://youtube.com/watch?v=5FPyx5Z5Jr0,902,15000
Kamli Wale Je Dar Na Dikhaya,https://youtube.com/watch?v=wExrnsOK-CU,805,15000
Ali Maula (Remix),https://youtube.com/watch?v=LvgtAoNHviY,398,15000
Nit Khair Mangan (Remix),https://youtube.com/watch?v=wGu47uoPXSk,398,15000
Haq Ali Ali (Remix),https://youtube.com/watch?v=KR9xv6qyL4A,342,15000
My Top Qawwalies,https://youtube.com/watch?v=7YRIWVYkWSU,6982,14000
Chand Roshan Hua,https://youtube.com/watch?v=9IATWT6OG9E,974,14000
Allah Hoo (Modern Version),https://youtube.com/watch?v=yhKiIGpfits,449,14000
Aa Wee Ja Sohnia,https://youtube.com/watch?v=OZAVhlHoCI8,1780,13000
Aja Re Aja Ajmeri Khawaja,https://youtube.com/watch?v=bfpJTTb5Vo8,1593,13000
Kee Janan Main Kaun Bhulliya,https://youtube.com/watch?v=sdXMYkhQbys,825,13000
Goriya Chali Pee Ke Des,https://youtube.com/watch?v=l4esnzbkNL8,461,13000
Shahbaz Qalander (Remix),https://youtube.com/watch?v=PUaa281fmSM,405,13000
Shikwa,https://youtube.com/watch?v=-ZHkrq85IeY,2208,12000
Data De Deewane,https://youtube.com/watch?v=lEX8LOZxH9I,1033,12000
Madina Tera Wasda Rahwe,https://youtube.com/watch?v=PDSRd-G9uIM,982,12000
Dum Mast Qalandar,https://youtube.com/watch?v=SvtnP1m2ttg,638,12000
Jana Jogi De Nal,https://youtube.com/watch?v=TSg8n4fIAUE,1943,11000
Allah Hoo Jalle Shan,https://youtube.com/watch?v=V6GkLmt8ubw,951,11000
Yaad e Nabi (Remix),https://youtube.com/watch?v=vPlZL-_MWYY,286,11000
Shahbaz Qalander,https://youtube.com/watch?v=XqLu7xpZPFc,779,10000
Changi Aan Mandan Aan Sahib Teri,https://youtube.com/watch?v=I8sUTlcyCWM,410,9800
Duma Dum (Dholki Mix),https://youtube.com/watch?v=c7smu5ft1NA,237,9700
Is Karam Ka Karoon Shukar Kaise Ada,https://youtube.com/watch?v=YJ_TmSDKNR0,1665,9600
Dukh Rog Ke - Mellow Mix & Simon & Diamond,https://youtube.com/watch?v=VMZ7bUwaRRU,303,9300
Khawaja Moin Uddin Usman Ke Pyare,https://youtube.com/watch?v=6R7St1voURU,914,8800
Yadaan Vichre Sajjan Diyan Aiyan ｜ Complete,https://youtube.com/watch?v=F8i-devgwKc,698,8600
Dama Dum (Scratch Mix),https://youtube.com/watch?v=DDcs-GREN7g,286,8500
Haq Ali Ali,https://youtube.com/watch?v=URKxZT1juqQ,2385,8400
Ganj Shakr Ke Naam Ka Sadqa,https://youtube.com/watch?v=cc_y2AeQ7KU,871,7400
`;

const lines = rawData.trim().split("\n").slice(1);
const songs = lines.map((line, idx) => {
  const parts = line.split(",");
  const views = parts.pop() || "0";
  const durationSec = parseInt(parts.pop() || "300", 10);
  const url = parts.pop() || "";
  const title = parts.join(",").trim();

  // Extract YouTube ID
  const ytMatch = url.match(/v=([a-zA-Z0-9_-]+)/);
  const ytId = ytMatch ? ytMatch[1] : "";

  const min = Math.floor(durationSec / 60);
  const sec = durationSec % 60;
  const durationStr = `${min}:${sec < 10 ? "0" : ""}${sec}`;

  return {
    id: `nfak-${idx + 1}`,
    title: title,
    artist: "Ustad Nusrat Fateh Ali Khan & Qawwali Masters",
    album: "Sufi Dawakhana Vault · Legacy Qawwalis",
    duration: durationStr,
    language: "Hindi",
    medVibe: "Soul-stirring Sufi Qawwali for 3 AM study, focus & spiritual peace.",
    lyricsSnippet: "हक़ अली अली मौला अली अली, ज़िक्र तेरा हर सांस में...",
    mood: "90s Medico Nostalgia",
    youtubeId: ytId,
    audioUrl: `https://www.youtube.com/watch?v=${ytId}`,
  };
}).filter(s => s.youtubeId);

console.log(`Parsed ${songs.length} Qawwali songs.`);

const tsCode = `export interface MedicalMovie {
  id: string;
  title: string;
  hindiTitle?: string;
  year: number;
  runtime: string;
  imdbRating: string;
  genres: string[];
  mbbsYear: "1st Year (Pre-Clinical)" | "2nd Year (Para-Clinical)" | "Final Year (Clinical)" | "Internship & Residency" | "All MBBS Years";
  medicalTheme: string;
  synopsis: string;
  medicoTakeaway: string;
  moodTag: "Inspirational" | "Emotional / Tearjerker" | "Lighthearted & Comedy" | "High Stakes ER / Surgery" | "Mind & Psychiatry" | "Classic Vintage";
  quote: string;
  tags: string[];
}

export interface MedicalSong {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  medVibe: string;
  lyricsSnippet: string;
  language: "Hindi" | "Punjabi" | "English";
  mood: "Late Night Study" | "Hostel Terrace & Chai" | "90s Medico Nostalgia" | "Casualty Focus" | "Convocation Pride" | "Medical Life Love";
  youtubeId: string;
  audioUrl: string;
  coverImage?: string;
}

export const MEDICAL_MOVIES: MedicalMovie[] = [
  {
    id: "munna-bhai-mbbs",
    title: "Munna Bhai M.B.B.S.",
    hindiTitle: "मुन्ना भाई एम.बी.बी.एस.",
    year: 2003,
    runtime: "2h 36m",
    imdbRating: "8.1/10",
    genres: ["Comedy", "Drama", "Medical"],
    mbbsYear: "All MBBS Years",
    medicalTheme: "Empathy, Doctor-Patient Relationship & Jadu Ki Jhappi",
    synopsis: "A lovable rogue enters Imperial Institute of Medical Studies, challenging rigid clinical stoicism with human touch and warmth.",
    medicoTakeaway: "Medicine is not merely biochemical pathology; treating the patient's spirit is half the cure.",
    moodTag: "Lighthearted & Comedy",
    quote: "Doctor bano toh dil se bano, sirf stethoscopes se nahi.",
    tags: ["Bollywood Classic", "GMC Campus Life", "Dean vs Student", "Empathy in Medicine"],
  },
  {
    id: "patch-adams",
    title: "Patch Adams",
    year: 1998,
    runtime: "1h 55m",
    imdbRating: "6.8/10",
    genres: ["Biography", "Comedy", "Drama"],
    mbbsYear: "1st Year (Pre-Clinical)",
    medicalTheme: "Holistic Healing & Clinical Compassion",
    synopsis: "Based on the true story of Dr. Hunter 'Patch' Adams, a medical student who believes laughter and emotional connection are the best medicine.",
    medicoTakeaway: "You treat a disease, you win, you lose. You treat a person, I guarantee you, you'll win, no matter what the outcome.",
    moodTag: "Inspirational",
    quote: "The purpose of a doctor is not just to prevent death, but to improve the quality of life.",
    tags: ["Robin Williams", "True Story", "Hospital Clown", "Humanism"],
  },
  {
    id: "anand",
    title: "Anand",
    hindiTitle: "आनन्द",
    year: 1971,
    runtime: "2h 12m",
    imdbRating: "8.8/10",
    genres: ["Drama", "Musical", "Medical Classics"],
    mbbsYear: "Final Year (Clinical)",
    medicalTheme: "Oncology, Palliative Care & Clinical Stoicism",
    synopsis: "Dr. Bhaskar Banerjee, a disillusioned oncologist, encounters Anand, a terminally ill patient who chooses to live his remaining days radiating pure joy.",
    medicoTakeaway: "Teaches every doctor how to carry the psychological weight of terminal prognosis without losing their humanity.",
    moodTag: "Emotional / Tearjerker",
    quote: "बाबू मोशाय, ज़िन्दगी बड़ी होनी चाहिए, लम्बी नहीं!",
    tags: ["Rajesh Khanna", "Amitabh Bachchan", "Masterpiece", "Palliative Care"],
  },
];

export const MEDICAL_SONGS: MedicalSong[] = ${JSON.stringify(songs, null, 2)};

export const MED_MOOD_PROMPTS = [
  "Nusrat Fateh Ali Khan classic qawwali for 3 AM Gray's anatomy study",
  "Kali Kali Zulfon Ke Phande Na for hostel terrace chai break",
  "Saja Hai Maikhana lo-fi vibe for post-viva relaxation",
  "Sanu Ek Pal Chain Na Aave for late night medical focus",
  "Yeh Jo Halka Halka Saroor Hai for convocation evening celebration",
];
`;

const outputPath = path.resolve(__dirname, "../src/data/medMedia.ts");
fs.writeFileSync(outputPath, tsCode);
console.log("medMedia.ts updated successfully with Qawwali songs dataset.");
