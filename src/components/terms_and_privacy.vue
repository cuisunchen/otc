<template>
  <div class="terms-and-privacy">
    <div class="top">
      <div class="left" @click="goBack" />
      <div class="fs-16" style="color: #2E3546;line-height: 3em;">{{this.$t("SignUp.TermsTitle")}}</div>
    </div>
    <div style="background: white;padding:50px 25px 25px 25px;">
      <div style="text-align: left;font-size: 14px;
        font-weight: bold;">CX免责声明和使用条款</div>
      <div
        style="word-break: break-all;    text-align: left;
        font-size: 12px;
        padding-top: 14px;
        color:#6D778B;
        "
      >
        CX 用户服务协议
        <br />本协议是您（以下简称“用户”）与次元口袋官方平台（包括Web端、APP及其他应用程序，以下统称“次元口袋”）提供的服务等相关事宜所订立的契约，对用户有法律约束力。次元口袋在此特别提醒用户认真阅读并充分理解本协议项下的各条款，特别是本协议中涉及免除或限制平台责任的条款，以及排除或限制用户权利的条款。用户应当审慎阅读，并选择接受或不接受本协议。除非用户接受本协议项下的所有条款，否则用户无权使用平台基于本协议所提供的服务。若用户不同意本协议的内容，或拒绝承认平台随时对本协议进行单方修改的权利，则用户应当立即停止使用并不再访问本平台。用户使用平台服务（包括但不限于注册、登录、使用、浏览等）即视为对本协议全部条款（包括次元口袋对本协议随时做出的任何修改）充分理解并完全接受，本协议即刻成立并生效。
        <br />第一条 释义
        <br />1.1 “本协议”，包括但不限于本用户服务协议、使用许可协议、隐私政策、售后服务政策和法律声明以及其他在平台上已经发布或将来可能发布的各类协议、规则、声明、说明或指引等。
        <br />1.2 “冷钱包”，指基于基于分层确定性 (Hierarchical Deterministic，简称 HD)技术方案来实现数字资产安全存储的硬件产品。冷钱包采用两种技术方案生成不同币种的私钥，一种为随机生成种子密码，并设置支付密码，由种子密码联合支付密码共同生成不同币种的私钥；另一种为随机生成助记词，由助记词生成不同币种的私钥。最终都由私钥生成公钥，最后由公钥生成资产地址来实现数字资产的安全存储。
        <br />1.3 “热钱包”，指基于区块链开发的数字资产钱包，包括其他为方便用户使用区块链系统而开发的辅助工具。
        <br />1.4 “公钥”，由私钥借助密码学原理单向推导生成，并用以生成区块链数字钱包地址，数字钱包地址即为公开收款地址。
        <br />1.5 “私钥”，由256位随机字符构成，是用户拥有并使用数字资产的关键。
        <br />1.6 “助记词”，指符合区块链BIP39行业标准，由随机算法生成的12（或15/18/21/24）个有序单词组成。是私钥的易记录表现形式，方便用户备份保管。
        <br />1.7 “支付密码”，指用户在创建钱包过程中，用户应当决定密码，该密码将被用于联合种子密码共同生成币种私钥，此密码不可修改，一旦用户丢失或忘记此密码，资产将无法找回。
        <br />1.8 “安全密码”，指用户在创建钱包过程中，用户应当决定密码，该密码将被用于保护私钥。安全密码不储存在用户的移动设备或次元口袋平台服务器，一旦用户忘记密码将无法找回，用户可借助私钥或助记词重新导入钱包后设置新的安全密码。
        <br />1.9 “关联公司”，指次元口袋与其他公司之间存在直接或间接控制关系或重大影响关系的公司。
        <br />第二条 平台服务
        <br />2.1 用户可以选择使用平台的不同语言版本，若存在平台的不同语言版本之内容不一致或者相冲突，或遗漏内容之情形，平台的中文文本应当优先适用。
        <br />2.2 平台系数字资产安全管理服务平台，由次元口袋向用户提供，具体服务内容主要包括：数字资产安全管理服务、数字资产交易信息发布、用户服务等辅助服务，具体详情以平台实际提供的服务内容为准。
        <br />2.3 用户访问或使用次元口袋平台服务，用户必须自行配备接入互联网所需上网设备，自行负担此服务各项费用，包括并不限于网络接入费、手机流量费等。当涉及使用任何第三方服务时，用户还应遵守第三方的服务准则和相关费用的规定。
        <br />2.4 在本协议履行过程中，次元口袋可根据情况对本协议进行修改。一旦本协议的内容发生变动，次元口袋将公布最新的服务协议，不再向用户作个别通知。如果用户不同意次元口袋对本协议所做的修改，用户有权停止使用平台服务。如果用户继续使用平台服务，则视为用户接受次元口袋对本协议所做的修改，并应遵照修改后的协议执行。
        <br />2.5 次元口袋对于用户的通知及任何其他的协议、告示或其他关于用户使用服务的通知，用户同意次元口袋可通过平台公告、站内信、电子邮件、手机短信等电子方式或邮寄等物理方式进行，该等通知于发送之日视为已送达收件人（如以邮寄方式向用户发出通知的，则在该等通知按照用户在平台留存的联系地址交邮后的第三个自然日即视为送达）。因不可归责于次元口袋的原因（包括电子邮件地址、手机号码、联系地址等不准确或无效、信息传输故障等）导致用户未在前述通知视为送达之日收到该等通知的，次元口袋不承担任何责任。
        <br />2.6 为了尽可能避免任何对资产钱包的误操作或数字资产的任何安全风险，用户应避免在不具备区块链基础知识的前提下使用平台服务。对不具备区块链基础知识的用户，次元口袋有权拒绝提供部分或全部的服务功能。
        <br />2.7 用户理解存在如下情形时，次元口袋将修改、暂停或彻底关闭平台服务，生效日期以平台公告为准，：
        <br />（1）因设备、区块链系统维修、升级、故障和通信中断等技术原因而中断平台的运营；
        <br />（2）因不可抗力等因素造成平台不能提供服务或次元口袋合理认为继续提供服务会有较大风险的；
        <br />（3）适用法律或政策发生重大不利变化的；或依据用户所属主权国家或地区的法律法规、规则、命令等规范的要求；
        <br />（4）出于保护平台或用户利益之合法利益；
        <br />（5）发生平台无法控制或合理预见的其他情形。
        <br />第三条 服务内容
        <br />3.1 用户注册
        <br />（1）用户应向次元口袋官网提供真实、准确、完整、合法有效的用户信息，并且当用户注册资料发生变动的应及时更新。如果用户提供的用户信息不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且次元口袋保留法律允许的范围内单方决定暂停或关闭用户账户并终止用户使用次元口袋各项服务的权利。
        <br />（2）用户注册成功后，将得到一个对应的用户名和密码，用户需对自己的用户名和密码安全负全部责任，且用户需对以其用户名进行的所有活动和事件负全部责任。用户若发现任何非法使用用户账号或存在安全漏洞的情况，应立即通知次元口袋请求暂停相关服务并向公安机关报案。同时，用户理解次元口袋对用户的请求采取行动需要合理期限，在此之前，次元口袋对第三人使用该服务所导致的损失不承担任何责任。
        <br />（3）为保护用户的个人权益，请勿使用重复性或者连续数字的简单密码，请勿将密码告知他人，如因密码保管不善造成的任何损失由用户个人承担。如用户使用手机号注册、重置密码、手机绑定等平台服务时，平台发送的校验码用户须严格保密，因校验码泄密造成的后果，由用户自行承担。
        <br />（4）用户不得将在平台注册获得的账户借给他人使用，否则用户应与实际使用人一起承担由此产生的全部责任。
        <br />3.2 钱包创建
        <br />（1）用户第一次创建钱包时，会弹出本协议，用户一旦同意创建钱包，即表示用户同意本协议的全部内容，且用户受到本协议之约束。若用户不具备本协议所要求之主体资格，则用户应承担因此而导致的一切后果，且次元口袋保留向用户追究责任的权利。
        <br />（2）用户在此承诺，出于合法目的创建钱包及使用平台服务，且不具有以平台为媒介违反法律法规之意图；用户保证存入钱包的数字资产来源合法；除本协议以外，用户应同时遵守平台不时发布及更新的全部规则，包括公告、使用流程说明、风险提示等。
        <br />3.3 平台提供的用户服务
        <br />（1）平台根据注册规则对用户提供如下服务：
        <br />a 数字资产安全管理服务；
        <br />b 数字资产各项目的实时行情及交易信息；
        <br />c 提供用户服务；
        <br />d 保障平台正常运营的技术和管理服务；
        <br />e 平台公示的其他服务。
        <br />（2）秉承着区块链的去中心化特点，并为了保护用户数字资产安全，平台提供的是去中心化服务，区别于银行业金融机构。用户了解并接受，平台不承担以下责任：存储用户的安全密码（即用户创建/导入钱包时设置的密码）、私钥、助记词；找回用户的安全密码、私钥、助记词；冻结钱包；挂失钱包；恢复钱包等。
        <br />（3）用户应当自行承担保管含有资产钱包的移动设备、备份钱包信息、备份安全密码、助记词、私钥的责任。如用户遗失移动设备、删除且未备份的钱包信息、删除且未备份钱包、钱包被盗或遗忘安全密码、私钥、助记词，平台均无法还原钱包或找回安全密码、私钥、助记词；如用户进行交易时误操作（例如输错转账地址、输错转账数额），平台无法取消交易，且平台亦不应对此承担任何责任。
        <br />第四条 平台责任限制
        <br />4.1 次元口袋不对以下服务提供任何形式的保证：
        <br />（1）平台服务将符合用户的需求；
        <br />（2）平台服务将不受干扰、及时提供或免于出错；
        <br />（3）用户经由平台服务购买或取得之任何产品、服务、资讯或其他资料将符合用户的期望；
        <br />（4）平台包含的全部信息、程序、文本、数据等完全安全，不受任何病毒、木马等恶意程序的干扰和破坏；
        <br />（5）所有的交易结果计算都经过平台核实，相应的计算方法都会在平台上进行公示，但是平台不能保证其计算没有误差或不受干扰。
        <br />4.2用户知悉并同意，在任何情形下，次元口袋不会就下列任一事项承担责任：
        <br />（1）用户的收入损失；
        <br />（2）用户的交易利润或合同损失；
        <br />（3）服务中断、中止或终止而引起的损失；
        <br />（4）预期可节省交易成本的损失；
        <br />（5）信息传递问题而造成的损失；
        <br />（6）数据的遗失或损坏而造成的损失；
        <br />（7）任何由于侵权（包括故意和过失）、违约、或其他任何原因导致的间接的、特殊的或附带性的损失，不论此种损失是否为平台所能合理预见，亦不论平台是否事先被告知存在此种损失的可能性；
        <br />（8）因用户遗失移动设备、删除且未备份钱包信息、遗忘且未备份安全密码、私钥、助记词等而导致该用户的数字资产丢失；
        <br />（9）因用户自行泄露安全密码、私钥、助记词等，或借用、转让或授权他人使用自己的移动设备或钱包，或未通过次元口袋官方渠道下载平台应用程序或以其他不安全的方式使用平台应用程序导致的用户的数字资产丢失；
        <br />（10）因用户错误操作（包括但不限于用户输错转账地址、用户自身选择转账节点服务器的问题）导致的数字资产丢失；
        <br />（11）因用户不理解区块链技术的知识而进行误操作导致的该用户的数字资产丢失；
        <br />（12）因系统滞后、区块链不稳定等原因导致平台拷贝用户在区块链上的交易记录发生偏差。
        <br />4.3用户知悉并同意，发生以下任一情形时，次元口袋有权拒绝赔偿用户的全部或部分损失：
        <br />（1）次元口袋有合理的理由认为用户在平台的行为系涉嫌违法或不道德行为；
        <br />（2）用户误以为系平台原因造成损失的情形；
        <br />（3）任何非因平台原因引起的其他损失。
        <br />4.4 平台服务的合作方所提供的服务品质及内容由该合作方自行负责。平台的内容可能涉及由第三方所有、控制或者运营的其他平台（以下简称“第三方平台”）。平台不能保证也没有义务保证第三方平台上任何信息的真实性和有效性。用户确认按照第三方平台的服务协议使用第三方平台，而不是按照本协议。第三方平台的内容、产品、广告和其他任何信息均由用户自行判断并承担风险，而与次元口袋平台无关。用户经由平台服务的使用下载或取得任何资料，应由用户自行考量且自负风险，因资料的下载而导致的任何损失由用户自行承担。
        <br />4.5 在法律允许的情况下，次元口袋对于与本协议有关或由本协议引起的，或者由于使用平台、或由于其所包含的或以其他方式通过平台提供给用户的全部信息、内容、材料、产品（包括软件）和服务、或购买和使用产品引起的任何间接的、惩罚性的、特殊的、派生的损失（包括业务损失、收益损失、利润损失、使用数据或其他经济利益的损失），不论是如何产生的，也不论是由对本协议的违约（包括违反保证）还是由侵权造成的，均不负有任何责任，即使其事先已被告知此等损失的可能性。另外即使本协议规定的排他性救济没有达到其基本目的，也应排除次元口袋对上述损失的责任。
        <br />4.6 次元口袋在本协议中做出的保证和承诺是次元口袋就其依据本协议提供平台服务的唯一保证和陈述（以下简称“协议保证”），所有协议保证仅针对平台做出，对平台自身具有约束力，其效力不能约束任何第三方。
        <br />4.7如因不可抗力或其它无法控制的原因使平台系统崩溃或无法正常使用导致交易无法完成或丢失有关的信息、记录等，次元口袋会尽合理努力协助处理善后事宜。
        <br />第五条 用户的声明与承诺
        <br />5.1 用户声明，具备完全民事权利能力和完全民事行为能力，能够独立承担法律责任。用户违反本项条件，次元口袋可随时、全权决定拒绝向用户提供服务，若因此给次元口袋或第三方造成损失，用户还须承担全部赔偿责任。如用户为限制民事行为能力人，只能在父母或监护人的监护参与下才能使用本平台，否则次元口袋有权在法律允许范围内暂停或关闭用户的账户。
        <br />5.2 用户承诺，绝不为任何非法目的或以任何非法方式使用平台服务，并承诺遵守其所在国的相关法律、法规及一切使用互联网之国际惯例，遵守所有与平台服务有关的网络协议、规则和程序。
        <br />5.3 用户理解并同意，用户在平台上选择的第三方服务由用户自行评估和选择。次元口袋对用户在平台上选择使用的第三方服务行为不承担任何责任，次元口袋无法也没有义务保证用户使用结果，用户因使用第三方服务导致的损失亦由用户自行承担，次元口袋不承担责任。
        <br />5.4 用户同意，对其平台注册账号下发生的所有活动（包括信息披露、发布信息、点击同意各类协议、上传提交各类文件、点击同意续签各类协议或点击同意第三方提供的服务协议等）承担责任，且在上述活动进程中，若用户未遵从本协议条款或平台公布的交易规则中的操作指示的，平台不承担任何责任。
        <br />5.5 用户同意，次元口袋有权在提供平台服务过程中以各种方式投放各种商业性广告或其他任何类型的商业信息（包括在平台的任何页面上投放广告），并且，用户同意接受平台通过电子邮件或其他方式向用户发送商业促销或其他相关商业信息。
        <br />5.6 用户同意，若用户因使用第三方服务与服务提供方或其他第三方产生纠纷的，不得通过司法或行政以外的途径要求平台提供相关资料。
        <br />5.7 用户使用平台服务时必须遵守国家法律法规，用户承诺严格履行以下义务：
        <br />（1）不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；
        <br />（2）从中国大陆向境外传输资料信息时必须符合中国有关法规；
        <br />（3）不得利用平台从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；
        <br />（4）不得干扰平台的正常运转，不得侵入平台及国家计算机信息系统；
        <br />（5）不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；
        <br />（6）不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；
        <br />（7）不得教唆他人从事本条所禁止的行为；
        <br />（8）不得利用在平台注册的账户进行牟利性经营活动；
        <br />（9）不得发布任何侵犯他人著作权、商标权等知识产权或合法权利的内容；
        <br />（10）不得以虚构、夸大事实等方式恶意诋毁平台商誉；
        <br />（11）其他次元口袋有正当理由认为不适当之行为。
        <br />5.8 用户应不时关注并遵守平台不时公布或修改的各类合法规则规定。次元口袋保有依其单独判断删除平台内各类不符合法律政策或不真实或不适当的信息内容而无须通知用户的权利，并无需承担任何责任。若用户未遵守以上规定的，次元口袋有权做出独立判断并采取暂停或关闭用户账户等措施，而无需承担任何责任。
        <br />5.9 用户同意，由于用户违反本协议，或违反通过援引并入本协议并成为本协议一部分的文件，或由于用户使用平台服务违反了任何法律或第三方的权利而造成任何第三方进行或发起的任何补偿申请或要求（包括律师费用），用户需对次元口袋及其关联方、合作伙伴、董事以及雇员等遭受损失方给予全额补偿并使之不受损害。
        <br />5.10 若用户违反本条内容，次元口袋有权视情节的严重采取警告、暂停服务、取消订单、禁止交易、关闭账号、永久禁止注册等措施，给次元口袋或第三方造成损失的，次元口袋有权采取一切合法的诉讼与非诉讼手段进行索赔；用户行为构成犯罪的，次元口袋有权通知和协助政府部门进行查处。
        <br />第六条 服务费用
        <br />6.1 用户使用平台服务时，若平台向用户收取相关平台服务费用，各项平台服务费用详见用户使用平台服务时平台上所列之收费说明及收费标准。平台保留单方面制定及调整平台服务费用收费标准的权利。
        <br />6.2 使用平台进行转账时应支付“矿工费”或网络费，金额由用户自行决定，并由相关区块链网络收取。用户知悉，在特定情况（包括但不限于用户在转账期间为转账支付的“矿工费”或网络费不足，或相关区块链网络不稳定）下，用户的转账操作可能失败；在该等情况下，即便用户的转账操作未完成，用户亦会被相关区块链网络收取矿工费。
        <br />6.3 因使用平台服务而发生的所有应纳税负及其它方面的费用均由用户自行负责支付。
        <br />第七条 用户信息授权及保护
        <br />7.1 用户信息，指
        <br />（1）用户注册平台账号或者使用账户时，用户根据本平台要求提供的个人注册信息，包括但不限于电话号码、邮箱信息、身份证件信息；
        <br />（2）用户使用平台服务时，或访问平台时，平台自动接收并记录的用户浏览器上的服务器数值，包括但不限于IP地址等数据及用户要求取用的网页记录；
        <br />（3）平台收集到的用户在平台进行交易的有关数据，包括但不限于交易记录；
        <br />（4）平台通过合法途径取得的其他用户个人信息。
        <br />7.2 用户同意，次元口袋可在平台的某些网页上使用诸如“Cookies”的资料收集装置，按照用户在平台上的行为自动追踪关于用户的某些资料。在不透露用户的隐私资料的前提下，平台有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。
        <br />7.3 用户在此特别授权，用户使用平台服务即视为用户同意次元口袋收集并使用或披露其个人信息，且用户了解并同意，基于为用户度身订造平台服务、解决争议及有助于确保用户在平台进行安全交易的考量，次元口袋可以将收集的用户个人信息用于下列用途：
        <br />（1）向用户提供平台服务；
        <br />（2）基于主权国家或地区相关主管部门的要求向相关部门进行报告；
        <br />（3）在用户使用平台服务时，平台将用户的信息用于身份验证、客户服务、安全防范、诈骗监测、市场推广、存档和备份用途，或与第三方合作等合法用途，确保平台向用户提供的产品和服务的安全性；
        <br />（4） 帮助平台设计新产品及服务，改善平台现有服务目的而进行的信息收集和整理；
        <br />（5）为了使用户了解平台服务的具体情况，用户同意平台向其发送营销活动通知、商业性电子信息以及提供与用户相关的广告以替代普遍投放的广告；
        <br />（6）平台为完成合并、分立、收购或资产转让而将用户的信息转移或披露给任何非关联的第三方；
        <br />（7）软件认证或管理软件升级；
        <br />（8）邀请用户参与有关平台服务的调查；
        <br />（9）用于和政府机关、公共事务机构、协会等合作的数据分析；
        <br />（10）用于解决争议或对纠纷进行调停；
        <br />（11）用作其他一切合法目的以及经用户授权的其他用途。
        <br />7.4 用户授权，次元口袋除法律另有规定之外，将用户提供给平台的信息、享受平台服务产生的信息（包括本协议签署之前提供和产生的信息）以及平台根据本条约定查询、收集的信息，用于平台及其因服务必要委托的合作伙伴为用户提供服务、推荐产品、开展市场调查与信息数据分析。
        <br />7.5 次元口袋将根据相关法律法规以保护用户的资料。用户因履行本协议提供给次元口袋的信息，除本协议约定之内容和目的，次元口袋不会恶意出售或免费共享给任何第三方。次元口袋亦将督促其合作伙伴对上述信息保密，并采取各种措施保证信息安全。
        <br />第八条 所有权及知识产权
        <br />8.1 平台上所有内容，包括著作、图片、档案、资讯、资料、平台架构、平台画面的安排、平台设计，文字和图表，软件编译，相关源代码和软件等均由次元口袋或其他权利人依法拥有其知识产权，包括商标权、专利权、著作权、商业秘密等,受国家法律保护,无论该等内容形成于本协议前还是本协议后。
        <br />8.2 除法律另有强制性规定外，未经次元口袋或其他权利人书面许可,任何单位或个人不得以任何方式非法地全部或部分使用、复制、转载、引用、链接、抓取或公开发表平台程序或内容，否则，次元口袋有权追究其法律责任。
        <br />8.3 用户未经次元口袋的明确书面同意不得下载（除了页面缓存）或修改平台或其任何部分。用户不得对平台或其内容进行转售或商业利用；不得收集和利用产品目录、说明和价格；不得对平台或其内容进行任何衍生利用；不得为其他商业利益而下载或拷贝账户信息或使用任何数据采集、Robots或类似的数据收集和摘录工具。未经平台的书面许可，严禁对平台的内容进行系统获取以直接或间接创建或编辑文集、汇编、数据库或人名地址录（无论是否通过Robots、Spiders、自动仪器或手工操作）。另外，严禁为任何未经本使用条件明确允许的目的而使用平台上的内容和材料。
        <br />8.4 用户使用平台提供的任何服务均不视为次元口袋向用户转让任何知识产权。尊重知识产权是用户应尽的义务，如有违反，用户应对次元口袋承担损害赔偿等法律责任。
        <br />第九条 风险提示
        <br />9.1 次元口袋对于用户使用平台服务不做任何明示或暗示的保证，包括但不限于平台提供服务的适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。同时，次元口袋也不对平台提供的服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、质量、稳定、完整和及时性做出任何承诺和保证。
        <br />9.2 是否使用平台服务是用户个人的决定且自行承担风险及可能产生的损失。次元口袋对于数字资产的市场、价值及价格等不做任何明示或暗示的保证，用户知悉并了解数字资产市场的不稳定性，数字资产的价格和价值随时会大幅波动或崩盘，交易数字资产是用户个人的自由选择及决定，且自行承担风险及可能产生的损失。
        <br />9.3 次元口袋不对任何用户及/或任何交易提供任何担保或条件，无论是明示、默示或法定的。次元口袋不能也不试图对用户或服务方发布的信息进行控制，对该等信息，平台不承担任何形式的证明、鉴定服务。平台不能完全保证平台内容的真实性、充分性、可靠性、准确性、完整性和有效性，并且无需承担任何由此引起的法律责任。用户应依赖于用户的独立判断进行交易，用户应对其做出的判断承担全部责任。
        <br />9.4 平台提供的行情查看功能仅系抓取部分交易所的数字资产汇率信息的搜索结果，并不表示为最新行情或最佳报价。
        <br />9.5 转账过程中，如果出现“交易失败”、“打包超时”等类似的异常信息提示时，用户应通过相关区块链官方途径或其他的区块链查询工具进行再次确认，以避免重复转账；否则，由此所引起的一切损失和费用应由用户自行承担。
        <br />9.6 用户应当在创建或导入钱包时对用户钱包的安全密码、私钥、助记词等信息做好安全备份。用户禁止采用以下电子备份方式：截图、邮件、手机中的记事本应用、短信、微信、QQ等电子备份方式。用户应当在纸质记事本上抄写助记词和Keystore等信息。若用户未保存或备份安全密码、私钥、助记词等信息且在用户移动设备丢失的情况下，用户的数字资产将可能因此丢失，次元口袋无法为用户找回。因前述情形产生的任何及所有损失应由用户自行承担。
        <br />9.7 以上并不能揭示用户通过平台进行交易的全部风险及市场的全部情形。用户在做出交易决策前，应全面了解相关数字资产，根据自身的交易目标、风险承受能力和资产状况等谨慎决策，并自行承担全部风险。
        <br />第十条 协议的终止
        <br />10.1 用户有权在任何时候向平台申请注销注册账户，自平台批准用户注销注册账户之日起协议终止。
        <br />10.2 用户死亡或被宣告死亡的，其在本协议项下的各项权利义务由其继承人承担。若用户丧失全部或部分民事权利能力或民事行为能力，次元口袋或其授权的主体有权根据有效法律文书（包括生效的法院判决等）或其法定监护人的指示处置与用户账户相关的款项。若继承人或法定监护人决定继续履行本协议的，则本协议依然有效；反之，则继承人或法定监护人需要依据本协议向平台申请注销账号，自平台批准用户注销账号之日起协议终止。
        <br />10.3 次元口袋有权依据本协议约定终止平台全部服务，本协议于平台全部服务终止之日终止，清退流程根据平台公告的具体规定进行操作。
        <br />10.4 本协议终止后，用户无权要求次元口袋继续向其提供任何服务或履行任何其他义务，包括但不限于要求次元口袋为用户保留或向用户披露其原本账号中的任何信息，向用户或第三方转发任何其未曾阅读或发送过的信息等。
        <br />10.5 本协议的终止不影响守约方向违约方主张其他协议终止前违约方之违约责任，也不影响本协议规定之后合同义务之履行。
        <br />第十一条 法律管辖和适用
        <br />11.1 本协议的内容、订立、执行和解释及争议的解决均应适用在中华人民共和国相关有效法律。如发生本协议与适用之法律相抵触时，则这些条款将完全按法律规定重新解释，而其它有效条款继续有效。
        <br />11.2 如就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，用户同意将纠纷或争议提交至中国国际经济贸易仲裁委员会华南分会仲裁解决。
        <br />第十二条 其他
        <br />12.1 次元口袋尊重用户的合法权利，本协议及本平台上发布的各类规则、声明等其他内容，均是为了更好的、更加便利的为用户提供服务。请用户着重阅读了解协议中以黑体、加粗等方式显著标识的条款。
        <br />12.2 如本协议中的任何条款被任何有管辖权的机构认定为不可执行的，无效的或非法的，并不影响本协议的其余条款的效力。
        <br />12.3 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，则应认为该条款可与本协议相分割，并可被尽可能接近各方意图的、能够保留本协议要求的经济目的的、有效的新条款所取代，而且，在此情况下本协议的其他条款仍然完全有效并具有约束力。
        <br />12.4 除非本协议中的其他条款另有约定，本协议中的任何规定均不应当被认为创造了、暗示了或以其他方式将次元口袋视为用户的代理人、受托人或其他代表人。
        <br />12.5 对违约行为的豁免，或本协议任一条款的放弃，仅在守约方或非寻求放弃方书面签字同意豁免后方能生效。任何本协议项下的违约豁免，不能认定或解释为守约方对其后再次违约或其他违约行为的豁免；未行使任何权利或救济不得以任何方式被解释为对该等权利或救济的放弃。
        <br />12.6 本协议的最终解释权归次元口袋所有。
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/terms_and_privacy.scss";
</style>