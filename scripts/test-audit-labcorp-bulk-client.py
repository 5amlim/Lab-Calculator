import importlib.util
import unittest
from pathlib import Path
spec=importlib.util.spec_from_file_location("bulk",Path(__file__).resolve().parent/"audit-labcorp-bulk-client.py")
bulk=importlib.util.module_from_spec(spec)
spec.loader.exec_module(bulk)

class TestBulk(unittest.TestCase):
    def test_exact_code_only(self):
        page='<table><tr><td>LabCorp</td><td>000455</td><td>Example<div>Container: Gel-barrier tube</div><div>Temperature: Maintain specimen at room temperature.</div></td><td>1</td></tr><tr><td>Other lab</td><td>000455</td><td>Container: red top</td><td>1</td></tr></table>'
        data=bulk.parse_catalog(page)
        self.assertEqual(list(data),['000455'])
        self.assertEqual(data['000455'][0]['container'],'Gel-barrier tube')
        self.assertEqual(data['000455'][0]['temperature'],'Maintain specimen at room temperature.')
    def test_no_unsafe_inference(self):
        self.assertIsNone(bulk.simple_temperature('Refrigerate or freeze'))
        self.assertIsNone(bulk.simple_temperature('Room temperature. Do not freeze.'))
        self.assertIsNone(bulk.simple_container('Gel-barrier tube or red-top tube'))
        self.assertIsNone(bulk.simple_container('Sterile cup'))
        self.assertIsNone(bulk.simple_container('Two lavender-top (EDTA) tubes'))
        self.assertEqual(bulk.simple_container('Royal Blue EDTA (purple stripe)'),'royal-blue-edta')
    def test_compare(self):
        data={'000455':[{'container':'Gel-barrier tube','temperature':'Frozen'}]}
        routes=[{'lab':'labcorp','disposition':'active','code':'000455','id':'one','draw':'SST / Gold','temperature':'Room Temperature'}]
        summary, rows=bulk.compare(data,routes)
        self.assertEqual(summary['counts']['codesWithSourceFields'],1)
        self.assertEqual(rows[0]['outcome'],'simple agreement')
        self.assertEqual(rows[1]['outcome'],'possible difference; review')
if __name__=='__main__':
    unittest.main()
