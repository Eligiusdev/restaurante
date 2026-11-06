const CATEGORY_PATHS={Entradas:'entradas','Platos Principales':'principales',Pastas:'pastas',Hamburguesas:'hamburguesas',Bebidas:'bebidas',Postres:'postres'};
const IMAGE_FILES={
 Entradas:{'Ceviche de camarón al maracuyá':'ceviche-de-camaron.jpg','Empanadas de la casa':'empanadas-de-la-casa.jpg','Carpaccio de res y alcaparras':'carpaccio-de-res.jpg','Burrata con tomate heirloom':'ensalada-de-burrata.jpg'},
 'Platos Principales':{'Lomo al vino tinto':'lomo-al-vino-tinto.jpeg','Salmón en costra de sésamo':'salmon-a-la-plancha.jpg','Pollo al romero y limón':'pollo-al-romero.jpg','Cerdo glaseado de panela':'bandeja-de-cerdo.jpg'},
 Pastas:{'Fettuccine Alfredo':'fettuccine-alfredo.jpg','Lasaña boloñesa':'lasana-bolonesa.jpg','Ravioles de espinaca':'ravioles-de-espinaca.jpg','Spaghetti pomodoro':'spaghetti-pomodoro.jpg'},
 Hamburguesas:{'Hamburguesa de trufa':'clasica.jpg','Hamburguesa doble queso ahumado':'doble-queso.jpg','Hamburguesa BBQ bacon crujiente':'bbq-bacon.jpg','Hamburguesa vegetal umami':'vegetal.jpg'},
 Bebidas:{'Limonada de coco':'limonada-de-coco.jpg','Copa de vino':'copa-de-vino.jpg','Mocktail cítrico de la casa':'jugo-natural.jpg'},
 Postres:{'Brownie tibio con helado':'brownie-con-helado.jpg','Tiramisú de café':'tiramisu.jpg','Cheesecake de maracuyá':'cheesecake-de-maracuya.jpg','Flan de caramelo':'flan-de-caramelo.jpg'}
};
export const LEGACY_IMAGE_FILES={
 'Ceviche de camarón':'ceviche-de-camaron.jpg','Carpaccio de res':'carpaccio-de-res.jpg','Ensalada de burrata':'ensalada-de-burrata.jpg',
 'Salmón a la plancha':'salmon-a-la-plancha.jpg','Pollo al romero':'pollo-al-romero.jpg','Bandeja de cerdo':'bandeja-de-cerdo.jpg',
 'Clásica':'clasica.jpg','Doble queso':'doble-queso.jpg','BBQ bacon':'bbq-bacon.jpg','Vegetal':'vegetal.jpg','Copa de vino':'copa-de-vino.jpg',
 'Brownie con helado':'brownie-con-helado.jpg','Tiramisú':'tiramisu.jpg'
};
const PHOTO_STYLE='Warm editorial food photography, 85mm lens, f/2.8 depth of field. Soft natural side light, tactile linen and earthy stone, honest ingredient color, gentle shadows.';
const slug=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const prompt=details=>`${PHOTO_STYLE} ${details} Refined contemporary restaurant plating, realistic edible ingredients, natural appetizing color, precise focus on the food, no text, no typography, no watermark.`;
const entries=[
 ['Ceviche de camarón al maracuyá','Camarones frescos marinados en limón y maracuyá, con cilantro y cebolla morada.',32000,'Entradas','Translucent just-cooked shrimp folded with glossy golden passion-fruit citrus leche de tigre, thin magenta red onion, cilantro leaves and tiny green chile, served chilled in a dark ceramic bowl with jewel-like droplets.'],
 ['Empanadas de la casa','Empanadas de maíz doradas, rellenas de carne sazonada y servidas con ají fresco.',18000,'Entradas','Three crisp golden corn empanadas split to reveal a juicy seasoned beef filling, delicate blistered pastry, fresh tomato and herb ají in a small handmade dipping bowl, scattered cilantro.'],
 ['Carpaccio de res y alcaparras','Finas láminas de res madurada con alcaparras, parmesano y aceite de oliva.',36000,'Entradas','Paper-thin ruby beef carpaccio arranged in overlapping folds, bright capers, translucent shaved parmesan, peppery arugula and a delicate sheen of olive oil on a chilled charcoal plate.'],
 ['Burrata con tomate heirloom','Burrata cremosa con tomates heirloom, albahaca fresca y reducción balsámica.',29000,'Entradas','A torn ivory burrata releasing a creamy center over vivid red, amber and green heirloom tomato wedges, fresh basil, glossy balsamic reduction and toasted sourdough crumbs.'],
 ['Lomo al vino tinto','Lomo de res sellado, jugoso al centro, con salsa de vino tinto y vegetales rostizados.',62000,'Platos Principales','Thick medium-rare beef tenderloin medallions with a deep seared crust and glistening rosy center, lacquered red-wine reduction, roasted baby carrots and crisp rosemary tips.'],
 ['Salmón en costra de sésamo','Salmón sellado con costra crujiente de sésamo, vegetales y cítricos.',58000,'Platos Principales','A moist coral salmon fillet with a crisp toasted sesame crust, clean sear marks, glossy citrus glaze, jewel-green vegetables and fine lemon zest arranged with modern precision.'],
 ['Pollo al romero y limón','Pollo rostizado jugoso con romero, limón asado y papas pequeñas.',42000,'Platos Principales','Golden roast chicken breast sliced to show a juicy tender interior, fragrant rosemary needles, charred lemon halves, crisp-edged baby potatoes and a light pan jus.'],
 ['Cerdo glaseado de panela','Cerdo tierno lacado en panela, con puré sedoso y vegetales de temporada.',46000,'Platos Principales','Slow-roasted pork with a glossy amber panela glaze, tender fibers, velvety pale root-vegetable puree, vivid seasonal greens and a few caramelized shallots.'],
 ['Fettuccine Alfredo','Fettuccine fresco en salsa Alfredo cremosa, parmesano y pimienta recién molida.',38000,'Pastas','Silky fresh fettuccine ribbons coated in glossy ivory parmesan Alfredo sauce, fine black pepper, delicate grated cheese curls and a small sprig of parsley.'],
 ['Lasaña boloñesa','Capas de pasta fresca, ragú de res cocido lentamente y queso gratinado.',41000,'Pastas','A clean-cut square of layered fresh pasta with rich slow-braised beef ragù, molten golden cheese, visible tender pasta sheets, bubbling edges and fresh basil.'],
 ['Ravioles de espinaca','Ravioles rellenos de espinaca y ricotta con mantequilla dorada y salvia.',39000,'Pastas','Plump handmade spinach-and-ricotta ravioli with delicate ridged edges, browned butter gloss, crisp sage leaves, toasted hazelnut crumbs and fine parmesan.'],
 ['Spaghetti pomodoro','Spaghetti al dente con tomate maduro, ajo, albahaca y aceite de oliva.',34000,'Pastas','Al dente spaghetti twirled into a tall nest, coated in bright slow-simmered tomato sauce with glossy olive oil, garlic, fresh basil leaves and shaved aged parmesan.'],
 ['Hamburguesa de trufa','Carne de res jugosa, queso fundido, trufa, cebolla caramelizada y pan brioche.',45000,'Hamburguesas','A juicy thick beef patty with a charred crust, molten aged cheese, glossy black truffle aioli, caramelized onions and a toasted brioche bun with crisp lettuce.'],
 ['Hamburguesa doble queso ahumado','Doble carne a la parrilla con dos quesos ahumados y salsa de la casa.',42000,'Hamburguesas','Two stacked flame-grilled beef patties with dripping smoked cheddar and gouda, glossy house sauce, pickled red onion and a deeply toasted sesame brioche bun.'],
 ['Hamburguesa BBQ bacon crujiente','Res a la parrilla, tocineta crujiente, queso y salsa BBQ de panela.',36000,'Hamburguesas','A flame-seared beef burger topped with crisp bacon shards, melted cheese and dark panela barbecue glaze, toasted bun, fresh lettuce and a juicy realistic patty texture.'],
 ['Hamburguesa vegetal umami','Medallón vegetal dorado con hongos, queso, rúgula y mayonesa de ajo.',31000,'Hamburguesas','A golden seared mushroom-and-legume patty with a rich textured bite, melted cheese, peppery arugula, roasted garlic aioli and a soft toasted whole-grain bun.'],
 ['Limonada de coco','Limonada cremosa de coco y limón, servida fría con hielo.',12000,'Bebidas','A chilled pale coconut-lime lemonade in a clear glass, fine ice crystals, condensation beads, a thin lime wheel, coconut foam and a restrained fresh mint garnish.','Limonada · Coco y limón'],
 ['Jugo natural de naranja en agua','Naranja recién exprimida y mezclada con agua, sin leche, servida fría.',9000,'Bebidas','Freshly squeezed bright orange juice blended with cold water, translucent vibrant orange color, fine citrus pulp, condensation on a tall chilled glass and a thin orange wheel.','Jugo natural · Naranja · En agua'],
 ['Jugo natural de mandarina en agua','Mandarina fresca licuada con agua para un jugo cítrico y ligero.',9000,'Bebidas','Fresh mandarin segments blended with cold water into a light vivid tangerine-orange juice, delicate citrus pulp, chilled glass condensation and a small mandarin peel twist.','Jugo natural · Mandarina · En agua'],
 ['Jugo natural de maracuyá en agua','Maracuyá natural licuado con agua, pulpa y semillas visibles.',9000,'Bebidas','Golden passion-fruit pulp blended with cold water, bright yellow-orange liquid, crisp black seeds suspended in the juice, beads of condensation and a fresh passion-fruit half.','Jugo natural · Maracuyá · En agua'],
 ['Jugo natural de maracuyá en leche','Maracuyá fresco preparado con leche fría, cremoso y ligeramente ácido.',11000,'Bebidas','Passion-fruit pulp blended with cold milk into a creamy pale-gold tropical juice, fine black seeds, soft ivory foam, chilled glass condensation and a cut passion fruit beside it.','Jugo natural · Maracuyá · En leche'],
 ['Jugo natural de fresa en agua','Fresas frescas licuadas con agua, de color rojo brillante y textura ligera.',10000,'Bebidas','Ripe strawberries blended with cold water into a vivid ruby-red juice, visible tiny fruit seeds, a light natural froth, chilled condensation and a fresh strawberry garnish.','Jugo natural · Fresa · En agua'],
 ['Jugo natural de fresa en leche','Fresas frescas licuadas con leche fría, cremosas y naturalmente dulces.',12000,'Bebidas','Ripe strawberries blended with cold milk into a smooth creamy pink strawberry drink, delicate pale foam, tiny fruit flecks, chilled glass condensation and a sliced strawberry garnish.','Jugo natural · Fresa · En leche'],
 ['Jugo natural de mora en agua','Moras maduras licuadas con agua, intenso, fresco y con pulpa natural.',10000,'Bebidas','Ripe blackberries blended with cold water into a deep purple-red juice, fine berry pulp and seeds, subtle foam, chilled glass condensation and a few glossy blackberries.','Jugo natural · Mora · En agua'],
 ['Jugo natural de mora en leche','Moras maduras preparadas con leche fría, cremosas y de color violeta.',12000,'Bebidas','Ripe blackberries blended with cold milk into a velvety lilac-purple drink, tiny dark berry flecks, a pale creamy foam, chilled condensation and fresh blackberries.','Jugo natural · Mora · En leche'],
 ['Jugo natural de mango en agua','Mango maduro licuado con agua, espeso, tropical y refrescante.',9000,'Bebidas','Ripe golden mango blended with cold water into a smooth saturated yellow-orange juice, natural pulp, a glossy surface, condensation and a neat mango fan garnish.','Jugo natural · Mango · En agua'],
 ['Jugo natural de mango en leche','Mango maduro licuado con leche fría, espeso y de textura sedosa.',12000,'Bebidas','Ripe golden mango blended with cold milk into a thick silky mango drink, creamy orange color, soft foam, fine fruit flecks and chilled glass condensation.','Jugo natural · Mango · En leche'],
 ['Jugo natural de lulo en agua','Lulo fresco licuado con agua, cítrico, aromático y con semillas finas.',10000,'Bebidas','Fresh lulo pulp blended with cold water into a vivid yellow-green citrus juice, tiny natural seeds, light froth, chilled condensation and a halved ripe lulo fruit.','Jugo natural · Lulo · En agua'],
 ['Jugo natural de piña en agua','Piña madura licuada con agua, ligera y tropical.',9000,'Bebidas','Fresh ripe pineapple blended with cold water into a bright tropical golden juice, fine pineapple pulp, a light foamy top, chilled condensation and a small pineapple wedge.','Jugo natural · Piña · En agua'],
 ['Cerveza artesanal Lager dorada','Lager rubia de cuerpo ligero, notas maltosas y espuma blanca persistente.',14000,'Bebidas','A clear chilled craft lager glowing deep straw-gold, lively fine carbonation, a dense creamy white head, condensation on a pilsner glass and toasted malt grains nearby.','Cerveza artesanal · Lager'],
 ['Cerveza artesanal IPA cítrica','IPA de amargor equilibrado, aromas cítricos y espuma cremosa.',16000,'Bebidas','A hazy amber craft IPA with a creamy ivory head, rising bubbles, citrus-peel aroma suggested by fresh grapefruit and orange zest, condensation on a tulip glass and green hops.','Cerveza artesanal · IPA cítrica'],
 ['Cerveza artesanal Amber Ale','Amber ale cobriza con notas de caramelo, malta tostada y espuma suave.',16000,'Bebidas','A clear copper-amber craft ale with ruby highlights, fine carbonation, a soft cream head, chilled glass condensation and toasted caramel malt with amber hops nearby.','Cerveza artesanal · Amber Ale'],
 ['Cerveza artesanal Stout','Stout oscura de cuerpo sedoso, notas de café y espuma color canela.',16000,'Bebidas','A nearly black silky stout with a dense tan crema head, subtle espresso-brown highlights, cold condensation on a stout glass and roasted coffee beans with dark malt nearby.','Cerveza artesanal · Stout'],
 ['Mocktail cítrico de la casa','Bebida sin alcohol de cítricos, hierbabuena y soda con burbujas.',16000,'Bebidas','A sparkling non-alcoholic citrus mocktail with translucent lime and grapefruit layers, rising soda bubbles, fresh mint and a thin citrus twist.','Mocktail · Cítrico sin alcohol'],
 ['Brownie tibio con helado','Brownie de chocolate tibio con centro húmedo y helado de vainilla.',16000,'Postres','A warm dark-chocolate brownie with a moist fudgy center and delicate crackled top, slowly melting vanilla bean ice cream, chocolate gloss and toasted cocoa nibs.'],
 ['Tiramisú de café','Capas de mascarpone y café con cacao espolvoreado al momento.',18000,'Postres','A precise layered tiramisu slice with airy mascarpone cream, coffee-soaked sponge, fine cocoa dust, visible delicate layers and a few dark espresso beans.'],
 ['Cheesecake de maracuyá','Cheesecake cremoso con coulis brillante de maracuyá y base crocante.',17000,'Postres','A smooth ivory cheesecake slice with a crisp golden crumb base, glossy amber passion-fruit coulis, visible seeds, a clean cut edge and tiny citrus zest.'],
 ['Flan de caramelo','Flan de vainilla sedoso con caramelo oscuro y textura temblorosa.',14000,'Postres','A silky vanilla custard flan with a delicate trembling texture, dark amber caramel cascading down its smooth sides, a small caramel pool and vanilla specks.']
];

export const CATALOGO=entries.map(([nombre,descripcion,precio,categoria,details,tipo],index)=>({
 id:`pr${index+1}`,
 nombre,
 descripcion,
 precio,
 categoria,
 tipo,
 disponible:true,
 imagen_prompt:prompt(details),
 imagen_url:`assets/images/dishes/${CATEGORY_PATHS[categoria]}/${IMAGE_FILES[categoria]?.[nombre]||'jugo-natural.jpg'}`
}));

for(const producto of CATALOGO){
 if(producto.nombre.startsWith('Jugo natural')){producto.imagen_url=`assets/images/dishes/bebidas/${slug(producto.nombre)}.webp`;producto.imagen_fallback='assets/images/dishes/bebidas/jugo-natural.jpg'}
 if(producto.nombre.startsWith('Cerveza artesanal')){producto.imagen_url=`assets/images/dishes/bebidas/${slug(producto.nombre)}.webp`;producto.imagen_fallback='assets/images/dishes/bebidas/cerveza-artesanal.jpg'}
}

export const buildImagePrompt=(nombre,categoria)=>prompt(`A beautifully plated ${nombre}, unmistakably presented as ${categoria.toLowerCase()}, with realistic ingredients and appetizing texture.`);
export const imageSlug=slug;
export const imageCategoryPath=categoria=>CATEGORY_PATHS[categoria]||'entradas';
