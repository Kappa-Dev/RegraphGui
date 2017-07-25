"""Example of usage of a new version of gene anatomizer."""

from new_anatomizer import GeneAnatomy


#if __name__ == '__main__':

#ptnlist = ['Q9UJX6', 'EGFR', 'wrongid', 'Q6PH85']
ptnlist = ['EGFR']

for ptn in ptnlist:

    anatomy = GeneAnatomy(
        ptn,
        merge_overlap=0.8,
        nest_overlap=0.8,
        nest_level=0,
        offline=True
    )
#    anatomy.anatomy_summary(fragments=True)

#    if anatomy.found:
#        print("Saving json anatomy in 'anatomy_%s.json'..." % ptn)
#        with open('anatomy_%s.json' % ptn, 'w') as f:
#            f.write(anatomy.to_json())
    for region in anatomy.domains :
        region_id = region.short_names[0]
        rtype = region.feature_type
        if rtype == 'Domain' or rtype == 'Repeat':
            print(region_id, region.feature_type)
