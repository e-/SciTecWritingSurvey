from handlers.base import BaseHandler

import logging
import datetime

class NewHandler(BaseHandler):
	def post(self):
		d=eval(self.get_argument("result"))
		d['created_at'] = datetime.datetime.now()
		d['ip'] = self.request.remote_ip
		self.db['sci']['res'].insert(d)

